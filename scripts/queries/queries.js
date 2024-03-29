const conn = new Mongo(`localhost:27017`),
    db = conn.getDB(`flock`),
    sightings = db.getCollection(`sightings`),
    birds = db.getCollection(`birds`),
    sites = db.getCollection(`sites`);
    states = db.getCollection(`states`);
    users = db.getCollection(`users`);
    
const bucket = new conn.GridFSBucket(db);

//Get All Users
all_users = users.find({});
print(all_users);


// ===========================Search by Birds ============================//

// Get All Birds
all_birds = birds.find(
    {},
    {species_code: 1, american_english_name: 1, _id:0}
);

print(all_birds);

//Regex Search Birds
const bird_name = `Abert's Towhee`;

search_bird = birds.find(
    {american_english_name: {$regex: new RegExp(`^${bird_name}`, 'i')}},
    { _id:0}
);
print('Searched Bird: ');
print(search_bird);


//Regex Bird Description
const description_text = `long beak`
search_description = birds.find(
    {bird_description: {$regex: new RegExp(`^${description_text}`, 'i')}},
    { _id:0}
);
print('Description: ');
print(search_description);


// =============Index Created=============//
// sightings.createIndex({SPECIES_CODE: 1})

// Worldwide Sightings of a Bird
const bird_id = 'abetow'

bird_sighting = sightings.find(
    {SPECIES_CODE: bird_id},
    {location: 1, Year:1, _id:0}
);

print('Bird Sightings:');
print(bird_sighting.toArray().length);



// ===========================Search by Location ============================//

// Get State Boundaries
state_boundaries = states.find({}).toArray();

print(state_boundaries);




// Get Unique Birds in a State

//get state polygon
const multiPolygon = db.states.findOne({ STUSPS: 'state_id' }).geometry.coordinates;

const uniqueValuesSet = new Set(); 

// =============Index Created=============//
print(`creating index 1`);
sightings.createIndex({location: "2dsphere"});
print(`created index 1`);
print(`creating index 2`);
sightings.createIndex({SUBNATIONAL1_CODE: 1, SPECIES_CODE: 1});
print(`created index 2`);

print(`fetching unique species in state`);
multiPolygon.forEach(polygon => {
    const sightingsWithinPolygon = sightings.aggregate([
        {
            $match: {
            location: {
                $geoWithin: {
                $geometry: {
                    type: "Polygon",
                    coordinates: polygon
                }
                }
            }
            }
        },
        {
            $group: {
                _id: '$SPECIES_CODE',
            }
        },
        {
            $project: {
                _id: 0, 
                species_code: '$_id',
            }
        },
        {
            $sort: { species_code: -1 } 
        }
        ]);
    // uniqueValuesSet.add(sightingsWithinPolygon.toArray())
    sightingsWithinPolygon.forEach(species => {
        uniqueValuesSet.add(species.species_code);
    });
});
    

print(uniqueValuesSet);


//Find Bird Image
myfile = bucket.findOne({filename: "Abert's Towhee.jpg"});
print(myfile);


// Get State Co-ordinates
const stateId = `WY`;
state_cood = states.findOne({STUSPS: stateId});

print(state_cood);


//Get Syayewise Bird Sightings
const bird = 'abetow';
const state_code = 'WY';

bird_sighting = sightings.find(
    {SUBNATIONAL1_CODE: "US-" + state_code, SPECIES_CODE: bird},
    {location: 1, Year:1, _id:0},
    {Year: 1, location: 1, _id:0}
);

print('Bird Sightings:');
print(bird_sighting.toArray().length);