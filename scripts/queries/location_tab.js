const conn = new Mongo(`localhost:27017`),
    db = conn.getDB(`flock`),
    sightings = db.getCollection(`sightings`),
    birds = db.getCollection(`birds`),
    states = db.getCollection(`states`);
    

// get state polygon
// const multiPolygon = db.states.findOne({ STUSPS: 'NY' }).geometry.coordinates;

// const uniqueValuesSet = new Set(); 

// ===========================Index Created ============================//
// print(`creating index`)
// sightings.createIndex({location: "2dsphere"});
// print(`created index`)
// 

// print(`fetching unique species in state`)
// multiPolygon.forEach(polygon => {
//     const sightingsWithinPolygon = sightings.aggregate([
//         {
//             $match: {
//             location: {
//                 $geoWithin: {
//                 $geometry: {
//                     type: "Polygon",
//                     coordinates: polygon
//                 }
//                 }
//             }
//             }
//         },
//         {
//             $group: {
//                 _id: '$SPECIES_CODE',
//             }
//         },
//         {
//             $project: {
//                 _id: 0, 
//                 species_code: '$_id',
//             }
//         },
//         {
//             $sort: { species_code: -1 } 
//         }
//         ]);
//     // uniqueValuesSet.add(sightingsWithinPolygon.toArray())
//     sightingsWithinPolygon.forEach(species => {
//         uniqueValuesSet.add(species.species_code);
//     });
// });
    

// print(uniqueValuesSet)