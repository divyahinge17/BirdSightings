# Flock & Roll

Welcome to Flock & Roll's GitHub repository!. Using our app, you can search for bird sightings either by location, their description and name.
Enjoy the interactive geospatial functionality, images. Don't forget to leave  a comment on the bird you like.

## Team Members

- **Poorna Chander Reddy, Puttaparthi** (`@poorna-chander`)
- **Omkar Sandip, Chavan** (`@comkar893`)
- **Divya Dilip, Hinge** (`@divyahinge17`)
- **Onkar Eknath, Shelar** (`@Onkar2102`)

## Datasets

### Data Sources 

![data sources](readmeImages/sources_details.png)

### Dataset Details 

![dataset details](readmeImages/dataset_details.png)

## Data Processing and Insertion:

Data processing and insertion scripts can be found in `/scripts/data_insertion/`

### Data Processing: 

The following table summarizes the data processing and insertion details. It also covers the challenges faced and how they were mitigated. The script that performs the data insertion is present at `scripts/data_insertion/data_insertion.py`. If not using the dump to restore, you can insert data using `python data_insertion.sh` (required libraries might need to installed using pip) 

![sata insertion details](readmeImages/data_insertion.png)

### Image Processing:

The following table summarizes the image insertion details. it also covers the challenges faced and how they were mitigated. the script that performs the image insertion is present at `scripts/data_insertion/image_insertion.sh`. If not using the dump to restore, you can insert images using `bash image_insertion.sh` 

![alt text](readmeImages/image_processing.png)

## Database and Collection Details:

- DB: flock
- Collections: 
    - sightings : 8394814 docuemnts
    - birds : 1090 documents
    - fs.files : 998 documents (bird images)
    - states : 56 documents (state boundry polygons)
    - sites : 284k docuemnts
    - users : initially empty and grows 
    - comments : initally empty and grows
- Indexes:
    - sightings -> ({SPECIES_CODE: 1})
    - sightings -> ({SUBNATIONAL1_CODE: 1, SPECIES_CODE: 1});
    - sightings -> ({location: "2dsphere"});

## Mongo Queries:

All the queries for each functionality are present in the express rout functions located at
`flocknroll/expressRoutes/routes.js`

The following table provides an overview of spectrum of mongo queries used and description of functionality for which they were used.

![alt text](readmeImages/queries_summary.png)

## Mongo Security:

The following diagram depicts the user, roles and collection level privilages that are configured for MongoDB to provide mimimal access.

Note: The application accesses the MongoDB as `mongoapp` user and the privilages can be seen in the diageam below.

![roles and users](readmeImages/roles_users.png)

## Tech Stack:

- Database : MongoDB
- Frontend : Next.js
- Backend : Express
- RuntimeEnv: Node.js

## Interesting App Searches:

- Select Search By Bird 
    - Change radio button to Bird Name (to search by substring in bird name):
        - search for any known or common bird (ex: Owl must give you all kinds of owls, or birds with owl in name)
    - Change radio button to Bird Description (to search by anything from bird description.)
        - Serach for `western` and the list shows birds that include `western` in their description.
        - Select a bird (e.g- `Acorn Woodpecker`) and check the map for sightings. Most sightings will be on west coast.
        - Next, search for `smallest` in Bird Details, and the list presents small birds like Hummingbird (e.g- `Calliope Hummingbird`)
        - More suggestions- Serach `eastern`, `tallest`, `florida`, `vision`.

        - In Bird Name, search `Barred Owl` to see intresting insight that its sighted mostly on coasts.
        - Similary, search `Costa's Hummingbird` to see its mostly sighted in around California.
        More suggestions- Serach `Anhinga` - found near water, `White-winged Crossbill`, `Golden-cheeked Warbler` - found in Texas.

- Select Search by Location
    - Select a state (e.g- California) and search for Birds in that state.
    - Search `Costa's Hummingbird` in California.
    - Search `Eurasian Collared-Dove` in Colorado has lots of sightings.
    - Hover over the markings on map to see `Year of Sightings`.

- Comments
    - If you comment for a bird you can view the comment in both Search by Location and Search by Birds flows.


## Bells and Whistles
- We have built an interactive user interface. especially for the for the geospatial functionality. (ex: plot state geopolygons and make them interactive)
- We have crunched huge volume of data (~8 million records)
- Despite having little knowledge on tech stack (Next.js, Express) when we started, We took up the challege and we are satisfied with what we have done.
- We have employed software development standards for collaboration and version control (ex: pull requests, dev and prod environments, pair programming, code reviews etc.) 
- We explored pracical usecases related to mongoDB like client side data validation, access management.
- Hosting both express and next.js on same port.
- We feel we did a good job with the README.

## Setup

### Database Setup:
- To create the DB using Database Dump you will need to navigate to `datadump` directory.
- Then you will use command `mongorestore --db flock --restoreDbUsersAndRoles --gzip flock`
- This command will add all the required collections to `flock` DB and MongoDB Users with roles assigned to them.
- You will need to enable the the authorization in `mongod.cnf` and restart the MongoDB Service to add authentication to MongoDB.
- Once the above step is completed you can login to MongoDB using `mongosh --host localhost -u mongoapp -p huMONGOu5 --authenticationDatabase flock` Command.

### Application Setup:
- To start `Flock & Roll` application navigate to `flocknroll` directory.
- Use `npm install` to install all the required dependencies.
- Create `.env.local` File in `flocknroll` directory
    - Add following Environment Variable for your local development:
        - `NEXT_PUBLIC_ENDPOINT_URL=http://localhost:3000`
- Now use `node server.js` to start the application.
- Once all of the above steps are completed you will be able to access application on `http://localhost:3000`

## MongoDB Schema

| Collection Name | Field Name             | Data Type        | Description                                         | Example Value                     |
|-----------------|------------------------|------------------|-----------------------------------------------------|-----------------------------------|
| birds           | `_id`                  | ObjectId         | Unique identifier for the document                 | `ObjectId('...')`                 |
|                 | `species_code`         | String           | Code identifying the species                       | `'grerhel'`                       |
|                 | `n_locations`          | Integer          | Number of locations observed                       | `1`                               |
|                 | `scientific_name`      | String           | Scientific name of the bird                        | `'Rhea americana'`                |
|                 | `american_english_name`| String           | American English name of the bird                  | `'Greater Rhea'`                  |
|                 | `bird_description`     | String           | Description of the bird                            | `'The Greater Rhea...'`           |
| counties        | `_id`                  | ObjectId         | Unique identifier for the document                 | `ObjectId('...')`                 |
|                 | `ZCTASCE10`            | String           | ZCTA Code                                          | `'36083'`                         |
|                 | `AFFGEOID10`           | String           | AFF GEO ID                                         | `'8600000US36083'`                |
|                 | `GEOID10`              | String           | GEO ID                                             | `'36083'`                         |
|                 | `ALAND10`              | Integer          | Land area in square meters                        | `659750662`                       |
|                 | `AWATER10`             | Integer          | Water area in square meters                       | `5522919`                         |
|                 | `geometry`             | Object           | Geometric data defining the shape of the county   | `{ type: 'MultiPolygon', ... }`   |
| sightings       | `_id`                  | ObjectId         | Unique identifier for the document                 | `ObjectId('...')`                 |
|                 | `LOC_ID`               | String           | Location ID                                        | `'L100032'`                       |
|                 | `SUBNATIONAL1_CODE`    | String           | Subnational code                                   | `'US-MN'`                         |
|                 | `ENTRY_TECHNIQUE`      | String           | Technique of data entry                            | `'PointMaker1.0_2'`               |
|                 | `SUB_ID`               | String           | Submission ID                                      | `'S100892U78'`                    |
|                 | `OBS_ID`               | String           | Observation ID                                     | `'OBS1320317836'`                 |
|                 | `Month`                | Integer          | Month of observation                               | `1`                               |
|                 | `Day`                  | Integer          | Day of observation                                 | `15`                              |
|                 | `Year`                 | Integer          | Year of observation                                | `2022`                            |
|                 | `PROJ_PERIOD_ID`       | String           | Project period identifier                          | `'PFW_2022'`                      |
|                 | `SPECIES_CODE`         | String           | Code identifying the species                       | `'brdowl'`                        |
|                 | `alt_full_spp_code`    | NaN              | Alternate full species code                        | `NaN`                             |
|                 | `HOW_MANY`             | Integer          | Count of how many were seen                        | `1`                               |
|                 | `PLUS_CODE`            | NaN              | Plus code                                          | `NaN`                             |
|                 | `VALID`                | Integer          | Validation field, likely boolean                   | `1`                               |
|                 | `REVIEWED`             | Integer          | Review field, likely boolean                       | `0`                               |
|                 | `DAY1_AM`              | Integer          | Indicator for AM of day 1, likely boolean          | `1`                               |
|                 | `DAY1_PM`              | Integer          | Indicator for PM of day 1, likely boolean          | `0`                               |
|                 | `DAY2_AM`              | Integer          | Indicator for AM of day 2, likely boolean          | `1`                               |
|                 | `DAY2_PM`              | Integer          | Indicator for PM of day 2, likely boolean          | `1`                               |
|                 | `EFFORT_HRS_ATLEAST`   | Double           | Minimum hours of effort                            | `1.001`                           |
|                 | `SNOW_DEP_ATLEAST`     | Double           | Minimum snow depth                                 | `5`                               |
|                 | `Data_Entry_Method`    | String           | Method used for data entry                         | `'PFW Web 4.1.5'`                 |
|                 | `Location`             | Object           | Location object with type and coordinates          | `{ type: 'Point', coordinates: [-93.1303282, 45.1323611] }` |
| sites           | `_id`                  | ObjectId         | Unique identifier for the document                 | `ObjectId('...')`                 |
|                 | `loc_id`               | String           | Location ID                                        | `'L100016'`                       |
|                 | `latitude`             | Double           | Latitude of the location                           | `48.823873`                       |
|                 | `longitude`            | Double           | Longitude of the location                          | `-124.0492365`                    |
|                 | `proj_period_id`       | String           | Project period identifier                          | `'PFW_2005'`                      |
|                 | `housing_density`      | Integer          | Housing density in the area                        | `2`                               |
|                 | `population_atleast`   | Integer          | Minimum population in the area                     | `1`                               |
|                 | `count_area_size_sq_m_atleast`| Double     | Minimum area size in square meters                 | `1.01`                            |
|                 | `description`          | String           | Description of the site                            | `'Yard type includes landscape...'`|
| states          | `_id`                  | ObjectId         | Unique identifier for the document                 | `ObjectId('...')`                 |
|                 | `STATEFP`              | String           | State FIPS code                                    | `'28'`                            |
|                 | `STATENS`              | String           | National Statistical code                          | `'01779790'`                      |
|                 | `AFFGEOID`             | String           | AFF GEO ID                                         | `'0400000US28'`                   |
|                 | `GEOID`                | String           | GEO ID                                             | `'28'`                            |
|                 | `STUSPS`               | String           | USPS state code                                    | `'MS'`                            |
|                 | `NAME`                 | String           | Name of the state                                  | `'Mississippi'`                   |
|                 | `LSAD`                 | String           | Legal/Statistical Area Description code            | `'00'`                            |
|                 | `ALAND`                | Integer             | Land area in square meters                         | `Long('121533519481')`            |
|                 | `AWATER`               | Integer             | Water area in square meters                        | `Long('3926919758')`              |
|                 | `center`               | Array            | Center point coordinates of the state              | `[32.354668, -89.398528]`         |
|                 | `geometry`             | Object           | Geometric data defining the shape of the state     | `{ type: 'MultiPolygon', ... }`   |
| users           | `_id`                | ObjectId  | Unique identifier for the document                     | `ObjectId('...')`                      |
|                 | `name`               | String    | Name of the user                                       | `'poorna'`                             |
|                 | `email`              | String    | Email address of the user                              | `'pp5109@rit.edu'`                     |
|                 | `password`           | String    | Password for user's account                            | `'12345'`                              |


![Schema Diagram of collections](readmeImages/Schema.png)

