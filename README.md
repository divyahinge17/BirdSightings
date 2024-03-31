# Flock & Roll

Welcome to Flock & Roll's GitHub repository! Our team is dedicated to leveraging the power of data to enhance our understanding of bird sightings across various locations from USA. Through meticulous analysis and innovative techniques, we aim to uncover patterns and insights that contribute to the broader field of ornithology and data science.

## Team Members

- **Poorna Chander Reddy, Puttaparthi** (`@poorna-chander`)
- **Omkar Sandip, Chavan** (`@comkar893`)
- **Divya Dilip, Hinge** (`@divyahinge17`)
- **Onkar Eknath, Shelar** (`@Onkar2102`)

## About The Project

Our project focuses on analyzing bird sighting data from multiple sources to draw meaningful insights into bird species' migration patterns, population densities, and habitat preferences. By combining traditional data analysis methods with modern data science techniques, we aim to contribute valuable information to the birdwatching community and wildlife conservation efforts.

## Datasets

We utilize three primary datasets in our analysis:

### Dataset Part 1: CornellLab FeederWatch Bird Sightings

- **Description**: This dataset includes detailed records of bird sightings from the Cornell Lab of Ornithology's FeederWatch program, featuring species details, sighting locations, and latitude-longitude coordinates.
- **Source**: [CornellLab FeederWatch Bird Sightings](https://feederwatch.org/explore/raw-dataset-requests/)

### Dataset Part 2: Bird Names with Images

- **Description**: Comprising bird names accompanied by high-quality images, this dataset serves as a visual reference to enhance our understanding of the species observed in the FeederWatch data.
- **Source**: [Bird Names with Images](https://dl.allaboutbirds.org/nabirds)

### Dataset Part 3: State/County/ZIP Boundaries

- **Description**: Geo polygons representing state, county, and ZIP boundaries are utilized to map bird sightings accurately to specific locations, aiding in spatial analysis.
- **Source**: [State/County/ZIP Boundaries](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html)

## How to Use This Repository

This repository contains the datasets, code, and analysis pertaining to our project. Here's how you can navigate through and make the most of our work:

- `notebooks/`-
    - Run `Data_Insertion_Script_v2.ipynb` for inserting data into flock database
    - Run `ImageSelection.ipynb` for fetching one image per bird
- `scripts/`: TBD
    - Run `loc_geo_correction.js` for geo locations update
    - Run `image_insertion.sh` to insert bird images into dataset.
- `bird_sightings_app/flocknroll`:
    - Add .env.local File in your bird_sightings_app/flocknroll directory and mention `NEXT_PUBLIC_ENDPOINT_URL=http://localhost:3000` to run App Locally.

## MongoDB Schema

### Birds Collection Schema

- `_id`: ObjectId
- `species_code`: String
- `n_locations`: Integer
- `scientific_name`: String
- `american_english_name`: String
- `bird_description`: String


### Counties Collection Schema

- `_id`: ObjectId
- `ZCTASCE10`: String
- `AFFGEOID10`: String
- `GEOID10`: String
- `ALAND10`: Integer
- `AWATER10`: Integer
- `geometry`: Object
  - `type`: String
  - `coordinates`: Array of Arrays of Numbers (Longitude and Latitude points)


### Sightings Collection Schema

- `_id`: ObjectId
- `LOC_ID`: String
- `SUBNATIONAL1_CODE`: String
- `ENTRY_TECHNIQUE`: String
- `SUB_ID`: String
- `OBS_ID`: String
- `Month`: Integer
- `Day`: Integer
- `Year`: Integer
- `PROJ_PERIOD_ID`: String
- `SPECIES_CODE`: String
- `alt_full_spp_code`: NaN (typically a String or Integer)
- `HOW_MANY`: Integer
- `PLUS_CODE`: NaN (typically a String)
- `VALID`: Integer (Boolean)
- `REVIEWED`: Integer (Boolean)
- `DAY1_AM`: Integer (Boolean)
- `DAY1_PM`: Integer (Boolean)
- `DAY2_AM`: Integer (Boolean)
- `DAY2_PM`: Integer (Boolean)
- `EFFORT_HRS_ATLEAST`: Double
- `SNOW_DEP_ATLEAST`: Double
- `Data_Entry_Method`: String
- `Location`: Object
  - `type`: String
  - `coordinates`: Array of Numbers (Longitude and Latitude)


### Sites Collection Schema

- `_id`: ObjectId
- `loc_id`: String
- `latitude`: Double
- `longitude`: Double
- `proj_period_id`: String
- `housing_density`: Integer
- `population_atleast`: Integer
- `count_area_size_sq_m_atleast`: Double
- `description`: String

### States Collection Schema

- `_id`: ObjectId
- `STATEFP`: String
- `STATENS`: String
- `AFFGEOID`: String
- `GEOID`: String
- `STUSPS`: String
- `NAME`: String
- `LSAD`: String
- `ALAND`: Long
- `AWATER`: Long
- `center`: Array of Numbers (Longitude and Latitude)
- `geometry`: Object
  - `type`: String
  - `coordinates`: Array of Arrays of Arrays of Numbers (Longitude and Latitude)

### `states_lowres` collection

### Users Collection Schema

- `_id`: ObjectId
- `name`: String
- `email`: String
- `password`: String


| Collection Name | Field Name           | Data Type | Description                                            | Example Value                          |
|-----------------|----------------------|-----------|--------------------------------------------------------|----------------------------------------|
| birds | | | | |
| counties        | `_id`                | ObjectId  | Unique identifier for the document                     | `ObjectId('...')`                      |
|                 | `ZCTASCE10`          | String    | ZCTA Code                                              | `'36083'`                              |
|                 | `AFFGEOID10`         | String    | AFF GEO ID                                             | `'8600000US36083'`                     |
|                 | `GEOID10`            | String    | GEO ID                                                 | `'36083'`                              |
|                 | `ALAND10`            | Number    | Land area in square meters                             | `659750662`                            |
|                 | `AWATER10`           | Number    | Water area in square meters                            | `5522919`                              |
|                 | `geometry`           | Object    | Geometric data defining the shape of the county        | `{ type: 'MultiPolygon', coordinates: [ ... ] }` |
| sightings       | `_id`                | ObjectId  | Unique identifier for the document                     | `ObjectId('...')`                      |
|                 | `LOC_ID`             | String    | Location ID                                            | `'L100032'`                            |
|                 | `SUBNATIONAL1_CODE`  | String    | Subnational code                                       | `'US-MN'`                              |
|                 | `ENTRY_TECHNIQUE`    | String    | Technique of data entry                                | `'PointMaker1.0_2'`                    |
|                 | `HOW_MANY`           | Integer   | Number indicating how many sightings                   | `1`                                    |
|                 | `Location`           | Object    | Location object with type and coordinates              | `{ type: 'Point', coordinates: [-93.1303282, 45.1323611] }` |
| sites           | `_id`                | ObjectId  | Unique identifier for the document                     | `ObjectId('...')`                      |
|                 | `loc_id`             | String    | Location ID                                            | `'L100016'`                            |
|                 | `latitude`           | Number    | Latitude of the location                               | `48.823873`                            |
|                 | `longitude`          | Number    | Longitude of the location                              | `-124.0492365`                         |
|                 | `description`        | String    | Description of the site                                | `'Yard type includes landscape. Feeding done in January, February, March, April, November, December. Presence of cats.'` |
| states          | `_id`                | ObjectId  | Unique identifier for the document                     | `ObjectId('...')`                      |
|                 | `NAME`               | String    | Name of the state                                      | `'Mississippi'`                        |
|                 | `ALAND`              | Long      | Land area in square meters                             | `Long('121533519481')`                 |
|                 | `AWATER`             | Long      | Water area in square meters                            | `Long('3926919758')`                   |
|                 | `center`             | Array     | Center point coordinates of the state                  | `[32.354668, -89.398528]`              |
|                 | `geometry`           | Object    | Geometric data defining the shape of the state         | `{ type: 'MultiPolygon', coordinates: [ ... ] }` |
| users           | `_id`                | ObjectId  | Unique identifier for the document                     | `ObjectId('...')`                      |
|                 | `name`               | String    | Name of the user                                       | `'poorna'`                             |
|                 | `email`              | String    | Email address of the user                              | `'pp5109@rit.edu'`                     |
|                 | `password`           | String    | Password for user's account                            | `'12345'`                              |

