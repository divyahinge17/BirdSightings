const conn = new Mongo(`localhost:27017`),
    db = conn.getDB(`flock`),
    sightings = db.getCollection(`sightings`),
    birds = db.getCollection(`birds`),
    sites = db.getCollection(`sites`),
    states = db.getCollection(`states`),
    users = db.getCollection(`users`),
    images = db.getCollection(`fs.files`);

//Get All Users
all_users = users.find({});
print(all_users);

// ===========================Search by Birds ============================//

// Get All Birds
all_birds = birds.find(
    {},
    { species_code: 1, american_english_name: 1, _id: 0 }
);

print(all_birds);

//Get Data for Selected Bird
const birdName = `Egyptian Goose`;

birdData = birds.findOne({
    american_english_name: birdName
},
    { _id: 0 });

print(birdData);

//Regex Search Birds
const bird_name = `Abert's Towhee`;

search_bird = birds.find(
    { american_english_name: { $regex: new RegExp(`^${bird_name}`, 'i') } },
    { _id: 0 }
);
print('Searched Bird: ');
print(search_bird);


//Regex Bird Description
const description_text = `5 feet`
search_description = birds.find(
    { bird_description: { $regex: new RegExp(`^${description_text}`, 'i') } },
    { _id: 0 }
);
print('Description: ');
print(search_description);


// =============Index Created=============//
// sightings.createIndex({SPECIES_CODE: 1})

// Worldwide Sightings of a Bird
const bird_id = 'abetow'

bird_sighting = sightings.find(
    { SPECIES_CODE: bird_id },
    { location: 1, Year: 1, _id: 0 }
);

print('Bird Sightings:');
print(bird_sighting.toArray().length);
print(bird_sighting);



// ===========================Search by Location ============================//




// Get State Boundaries
state_boundaries = states.find({}).toArray();

print(state_boundaries);




// Get Unique Birds in a State

//get state polygon
const stateData = db.states.findOne({ STUSPS: 'WY' });
const stateGeometry = stateData.geometry;
const coord = stateGeometry.coordinates;

const uniqueValuesSet = new Set();

// =============Index Created=============//
// print(`creating index 1`);
// sightings.createIndex({location: "2dsphere"});
// print(`created index 1`);
// print(`creating index 2`);
// sightings.createIndex({SUBNATIONAL1_CODE: 1, SPECIES_CODE: 1});
// print(`created index 2`);

print(`fetching unique species in state`);
if (stateGeometry.type == "Polygon") {
    const sightingsWithinPolygon = sightings.aggregate([
        {
            $match: {
                location: {
                    $geoWithin: {
                        $geometry: {
                            type: "Polygon",
                            coordinates: coord,
                        },
                    },
                },
            },
        },
        {
            $group: {
                _id: "$SPECIES_CODE",
            },
        },
        {
            $project: {
                _id: 0,
                species_code: "$_id",
            },
        },
        {
            $sort: { species_code: -1 },
        },
    ])
        .toArray();

    sightingsWithinPolygon.forEach((species) => {
        uniqueValuesSet.add(species.species_code);
    });
} else {

    coord.forEach((polygon) => {
        const sightingsWithinPolygon = sightings
            .aggregate([
                {
                    $match: {
                        location: {
                            $geoWithin: {
                                $geometry: {
                                    type: "Polygon",
                                    coordinates: polygon,
                                },
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$SPECIES_CODE",
                    },
                },
                {
                    $project: {
                        _id: 0,
                        species_code: "$_id",
                    },
                },
                {
                    $sort: { species_code: -1 },
                },
            ])
            .toArray();

        sightingsWithinPolygon.forEach((species) => {
            uniqueValuesSet.add(species.species_code);
        });
    });
}

print(uniqueValuesSet);

//Find Bird Image

print("Get Image");
const birdImage = images.findOne({ filename: 'Mallard.jpg' });
print(birdImage);


// Get State Co-ordinates
const stateId = `WY`;
const state_cood = states.findOne({ STUSPS: stateId });

print(state_cood);


//Get Statewise Bird Sightings
const bird = 'mallar3';
const state_code = 'WY';

const bird_sighting = db.sightings.find(
    { SUBNATIONAL1_CODE: "US-" + state_code, SPECIES_CODE: bird },
    { location: 1, Year: 1, _id: 0 }
);

print('Bird Sightings:');
print(bird_sighting.toArray())
print(bird_sighting.toArray().length);