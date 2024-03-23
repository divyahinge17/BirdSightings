const conn = new Mongo(`localhost:27017`),
    db = conn.getDB(`flock`),
    sightings = db.getCollection(`sightings2`),
    birds = db.getCollection(`birds`),
    sites = db.getCollection(`sites`);
    
const bucket = new conn.GridFSBucket(db);

// Get All Birds
all_birds = birds.find(
    {},
    {species_code: 1, american_english_name: 1, _id:0}
);

print(all_birds);

// Search by Bird
const bird_name = `Abert's Towhee`;

search_bird = birds.find(
    {american_english_name: {$regex: new RegExp(`^${bird_name}`, 'i')}},
    {species_code: 1, american_english_name: 1, _id:0}
)

print('Searched Bird: ')
print(search_bird)

// ===========================Index Created ============================//
// sightings.createIndex({SPECIES_CODE: 1})

// Sighting of a Bird
const bird_id = 'abetow'

bird_sighting = sightings.find(
    {SPECIES_CODE: bird_id},
    {location: 1, Year:1, _id:0}
)

print('Bird Sightings:')
print(bird_sighting.toArray().length)


// result = db.sightings.aggregate([
//     {
//         $group: {
//             _id: '$SPECIES_CODE',
//             count: { $sum: 1 }
//         }
//     },
//     {
//         $project: {
//             _id: 0, // Exclude the _id field from the result
//             species_code: '$_id',
//             count: 1
//         }
//     },
//     {
//         $sort: { count: -1 } // Sort by count in descending order
//     }
// ]);

// result.forEach(res => {
//     print(res)
// })


//Find Bird image

myfile = bucket.findOne({filename: "Abert's Towhee.jpg"})
print(myfile)