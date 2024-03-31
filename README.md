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

## Birds Collection Schema

- `_id`: ObjectId
- `species_code`: String
- `n_locations`: Integer
- `scientific_name`: String
- `american_english_name`: String
- `bird_description`: String


## Counties Collection Schema

- `_id`: ObjectId
- `ZCTASCE10`: String
- `AFFGEOID10`: String
- `GEOID10`: String
- `ALAND10`: Number (long integer)
- `AWATER10`: Number (long integer)
- `geometry`: Object
  - `type`: String
  - `coordinates`: Array of Arrays of Numbers (Longitude and Latitude points)


## Sightings Collection Schema

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
- `alt_full_spp_code`: NaN (typically a String or Number)
- `HOW_MANY`: Integer
- `PLUS_CODE`: NaN (typically a String)
- `VALID`: Integer (often representing a Boolean)
- `REVIEWED`: Integer (often representing a Boolean)
- `DAY1_AM`: Integer (often representing a Boolean)
- `DAY1_PM`: Integer (often representing a Boolean)
- `DAY2_AM`: Integer (often representing a Boolean)
- `DAY2_PM`: Integer (often representing a Boolean)
- `EFFORT_HRS_ATLEAST`: Number
- `SNOW_DEP_ATLEAST`: Number
- `Data_Entry_Method`: String
- `Location`: Object
  - `type`: String
  - `coordinates`: Array of Numbers (Longitude and Latitude)


## Sites Collection Schema

- `_id`: ObjectId
- `loc_id`: String
- `latitude`: Number
- `longitude`: Number
- `proj_period_id`: String
- `housing_density`: Integer
- `population_atleast`: Integer
- `count_area_size_sq_m_atleast`: Number
- `description`: String

## States Collection Schema

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
  - `coordinates`: Array of Arrays of Arrays of Numbers (Longitude and Latitude points for MultiPolygon)

Note: The coordinates array is typically a complex structure for representing the shapes of geographic entities like states, and it has been truncated here for brevity.


### `states_lowres` collection

## Users Collection Schema

- `_id`: ObjectId
- `name`: String
- `email`: String
- `password`: String
