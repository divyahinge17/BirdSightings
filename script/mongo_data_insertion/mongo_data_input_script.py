import pandas as pd
import geopandas as gpd
from pymongo import MongoClient
from tqdm import tqdm
import time
import json

collections_path = {
    'sightings': '../dataset/sightings/sightings_2021_2023.csv',
    'birds': '../dataset/birds/birds.csv',
    'sites': '../dataset/sites/sites.csv',
    'states': '../dataset/state_boundaries/cb_2018_us_state_500k.shp',
    'counties': '../dataset/county_boundaries/cb_2018_us_zcta510_500k.shp'
}

columns_to_drop = {
    'sightings': ['SUB_ID','PLUS_CODE','DAY1_AM','DAY1_PM','DAY2_AM','DAY2_PM','EFFORT_HRS_ATLEAST','SNOW_DEP_ATLEAST'],
    'birds': ['taxonomy_version','taxonomic_sort_order'],
    'sites': [],
    'states': [],
    'counties': []
}

# Splitting Data into Batches
def split_list_into_batches(data, batch_size):
    for i in range(0, len(data), batch_size):
        yield data[i:i + batch_size]


#Connect to MongoDB
def connect_to_mongo(collection_name):
    client= MongoClient('mongodb://localhost:27017/')
    db = client['flock']
    collection = db[collection_name]
    
    return client, collection

#read csv in chunks and yield records jsons
def read_csv_in_chunks(csv_path, chunk_size, cols_to_drop = []):
    chunk_number = 1
    for chunk in pd.read_csv(csv_path, chunksize=chunk_size):
        # print('\nConverting Dataframe (chunk : {}) to Dictionary...'.format(chunk_number))
        chunk = chunk.drop(cols_to_drop, axis=1)
        yield chunk.to_dict('records'), chunk.shape[0], chunk_number
        chunk_number += 1
        
#Insert data in MongoDB
def insert_data(records, collection_name, batch_size):
    start_time = time.time()
    batches = split_list_into_batches(records, batch_size)
    client, collection = connect_to_mongo(collection_name)
    #Insert Data in Batches
    for batch in tqdm(batches):
        collection.insert_many(batch)
    end_time = time.time()
    total_time = end_time - start_time
    print('Time Taken to Insert Data: ' + str(total_time))
    client.close()

print("")

# Inserting Data in `sightings` Collection
print('starting data insertion for signtings collection...')
collection_name = 'sightings'
cols_to_drop  = columns_to_drop[collection_name]
csv_path = collections_path[collection_name]
chunk_size_csv_read = 1000000
chunk_size_insert = 1000
total_records = 0
for chunk_records, current_chunk_size, current_chunk_number  in read_csv_in_chunks(csv_path, chunk_size_csv_read):
    print('\nInserting Data in from csv chunk : {} with {} records into '.format(current_chunk_number, current_chunk_size) +collection_name+' Collection')
    insert_data(chunk_records, collection_name, chunk_size_insert)
    total_records += current_chunk_size
print('Total Records inserted: ' + str(total_records))
print("")

#correction of geo poit geometry syntax
client, collection = connect_to_mongo("sightings")
result = sightings.update_many(
   {},
   [
       {
           "$set": {
               "location": {
                   "$cond": {
                       "if": {
                           "$or": [
                               {"$eq": ["$LONGITUDE", ""]},
                               {"$eq": ["$LATITUDE", ""]},
                               {"$eq": ["$LONGITUDE", " "]},
                               {"$eq": ["$LATITUDE", " "]},
                           ]
                       },
                       "then": None,
                       "else": {
                           "type": "Point",
                           "coordinates": ["$LONGITUDE", "$LATITUDE"],
                       },
                   }
               }
           }
       },
       {"$unset": ["LONGITUDE", "LATITUDE"]},
   ]
)
print(f"Number of documents updated: {result.modified_count}")


# Inserting Data in `birds` Collection
print('starting data insertion for birds collection...')
print('Reading CSV...')
collection_name = 'birds'
df = pd.read_csv(collections_path[collection_name])
print('Total Records: ' + str(df.shape[0]))
df = df.drop(columns_to_drop[collection_name], axis=1)
print('\nConverting Dataframe to Dictionary...')
records = df.to_dict('records')
print('\nInserting Data in ' + collection_name + ' Collection')
insert_data(records, collection_name, 10000)
print("")

# Inserting Data in `sites` Collection
print('starting data insertion for sites collection...')
print('Reading CSV...')
collection_name = 'sites'
df = pd.read_csv(collections_path[collection_name])
print('Total Records: ' + str(df.shape[0]))
df = df.drop(columns_to_drop[collection_name], axis=1)
start_time = time.time()
column_mapping = {
    'yard_type_pavement': 'pavement',
    'yard_type_garden': 'garden',
    'yard_type_landsca': 'landscape',
    'yard_type_woods': 'woods',
    'yard_type_desert': 'desert',
    'hab_dcid_woods': 'DCID woods',
    'hab_evgr_woods': 'evergreen woods',
    'hab_mixed_woods': 'mixed woods',
    'hab_orchard': 'orchard',
    'hab_park': 'park',
    'hab_water_fresh': 'freshwater',
    'hab_water_salt': 'saltwater',
    'hab_residential': 'residential',
    'hab_industrial': 'industrial',
    'hab_agricultural': 'agricultural',
    'hab_desert_scrub': 'desert scrub',
    'hab_young_woods': 'young woods',
    'hab_swamp': 'swamp',
    'hab_marsh': 'marsh',
    'squirrels': 'squirrels',
    'cats': 'cats',
    'dogs': 'dogs',
    'humans': 'humans',
    'fed_yr_round': 'year-round',
    'fed_in_jan': 'January',
    'fed_in_feb': 'February',
    'fed_in_mar': 'March',
    'fed_in_apr': 'April',
    'fed_in_may': 'May',
    'fed_in_jun': 'June',
    'fed_in_jul': 'July',
    'fed_in_aug': 'August',
    'fed_in_sep': 'September',
    'fed_in_oct': 'October',
    'fed_in_nov': 'November',
    'fed_in_dec': 'December',
    'supp_food': 'supplementary food'
}
descriptions = []
for index, row in tqdm(df.iterrows()):
    yard_description = []
    habitat_description = []
    feeding_description = []
    presence_description = []
    description = ''
    for column in df.columns:
        if row[column] == 1.0:
            if column in column_mapping:
                if column.startswith('yard_type'):
                    yard_description.append(column_mapping[column])
                elif column.startswith('hab_'):
                    habitat_description.append(column_mapping[column])
                elif column.startswith('fed_'):
                    feeding_description.append(column_mapping[column])
                elif column in ['cats', 'dogs', 'squirrels', 'humans', 'supp_food']:
                    presence_description.append(column_mapping[column])
                    
    if len(yard_description)>0:
        description += 'Yard type includes {}.'.format(', '.join(yard_description))
    if len(habitat_description)>0:
        description += ' Habitat type includes {}.'.format(', '.join(habitat_description))
    if len(feeding_description)>0:
        description += ' Feeding done in {}.'.format(', '.join(feeding_description))
    if len(presence_description)>0:
        description += ' Presence of {}.'.format(', '.join(presence_description))
    descriptions.append(description)
df['description'] = descriptions

columns_to_add = ['loc_id', 'latitude', 'longitude', 'proj_period_id', 'housing_density', 'population_atleast', 'count_area_size_sq_m_atleast']
df = df[columns_to_add + ['description']]

end_time = time.time()
total_time = end_time - start_time

print('Time Taken to Create Description: ' + str(total_time))

print('\nConverting Dataframe to Dictionary...')
records = df.to_dict('records')

print('\nInserting Data in ' + collection_name + ' Collection')
insert_data(records, collection_name, 10000)
print("")

# Inserting Data in `states` Collection
print('starting data insertion for states collection...')
print('Reading SHP...')
collection_name = 'states'
gdf = gpd.read_file(collections_path[collection_name])

print('Total Records: ' + str(gdf.shape[0]))
gdf = gdf.drop(columns_to_drop[collection_name], axis=1)
gdf['geometry'] = gdf['geometry'].apply(lambda x: x.__geo_interface__)

print('\nConverting Dataframe to Dictionary...')
records = gdf.to_dict('records')

print('\nInserting Data in ' + collection_name + ' Collection')
insert_data(records, collection_name, 10000)
print("")

## Inserting Data in `counties` Collection
print('starting data insertion for counties collection...')
print('Reading SHP...')
collection_name = 'counties'
gdf = gpd.read_file(collections_path[collection_name])

print('Total Records: ' + str(gdf.shape[0]))
gdf = gdf.drop(columns_to_drop[collection_name], axis=1)
gdf['geometry'] = gdf['geometry'].apply(lambda x: x.__geo_interface__)

print('\nConverting Dataframe to Dictionary...')
records = gdf.to_dict('records')

print('\nInserting Data in ' + collection_name + ' Collection')
insert_data(records, collection_name, 10000)


