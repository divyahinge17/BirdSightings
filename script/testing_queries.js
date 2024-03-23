const conn = new Mongo(`localhost:27017`),
    db = conn.getDB(`flock`),
    sightings = db.getCollection(`sightings`),
    birds = db.getCollection(`birds`),
    sites = db.getCollection(`sites`),
    counties = db.getCollection(`counties`),
    states = db.getCollection(`states`);
    
// const bucket = new conn.GridFSBucket(db);

// Get All Birds
all_birds = birds.findOne();

print(all_birds);

print("----------------------------------------------------------");


print("Print all the bird names with name containing characters from bird_name, case-insensitive");
const search_by_bird = `se`;

listOfAllBirds = birds.find({
    american_english_name: {$regex: new RegExp(search_by_bird, 'i')}
  },
  {american_english_name: 1, _id: 0});

print(listOfAllBirds);


print("----------------------------------------------------------");

print("select the bird name form the list shown and assign it to the following variable");
const bird_name = 'Egyptian Goose';


print("----------------------------------------------------------");

print("for the selected bird get species code from the birds collection");
birdData = birds.find({
    american_english_name: bird_name
},
{species_code:1, _id: 0});

print(birdData);


print("____________________________________________________________");

// print("searching the species code in the sightings collection");
// birdSighting = sightings.find({
//   SPECIES_CODE: "egygoo"
// });

// print(birdSighting);

// print(birdData.species_code);


print("____________________________________________________________");

print("for the selected bird get all the information");
// Check if birdData is not null
if (birdData) {
    const bird_species_code = 'egygoo';
  
    // Now, use the species code to find all related sightings
    const results = birds.aggregate([
      { $match: { species_code: bird_species_code } },
      {
        $lookup: {
          from: 'sightings',
          localField: 'species_code',
          foreignField: 'SPECIES_CODE',
          as: 'related_sightings'
        }
      },
      {
        $project: {
          _id: 0,
          species_code: 1,
          alt_full_spp_code: 1,
          n_locations: 1,
          scientific_name: 1,
          american_english_name: 1,
          "related_sightings.LOC_ID": 1,
          "related_sightings.LATITUDE": 1,
          "related_sightings.LONGITUDE": 1,
          "related_sightings.SUBNATIONAL1_CODE": 1,
          "related_sightings.ENTRY_TECHNIQUE": 1,
          "related_sightings.SUB_ID": 1,
          "related_sightings.OBS_ID": 1,
          "related_sightings.Month": 1,
          "related_sightings.Day": 1,
          "related_sightings.Year": 1,
          "related_sightings.PROJ_PERIOD_ID": 1,
          "related_sightings.SPECIES_CODE": 1,
          "related_sightings.alt_full_spp_code": 1,
          "related_sightings.HOW_MANY": 1,
          "related_sightings.PLUS_CODE": 1,
          "related_sightings.VALID": 1,
          'related_sightings.REVIEWED': 1,
          "related_sightings.DAY1_AM": 1,
          "related_sightings.DAY1_PM": 1,
          "related_sightings.DAY2_AM": 1,
          "related_sightings.DAY2_PM": 1,
          "related_sightings.EFFORT_HRS_ATLEAST": 1,
          "related_sightings.SNOW_DEP_ATLEAST": 1,
          "related_sightings.Data_Entry_Method": 1
        }
      },
      {
        $limit: 3
      }
    ]);
  
    print(results);
    // Print the results
    // print(JSON.stringify(results, null, 2));
} 
else {
    print(`No birds found with the name ${bird_name}`);
}




// // Search by Bird
// const bird_name = `Abert's Towhee`;

// search_bird = birds.find(
//     {american_english_name: {$regex: new RegExp(`^${bird_name}`, 'i')}},
//     {species_code: 1, american_english_name: 1, _id:0}
// )

// print('Searched Bird: ')
// print(search_bird)

// // ===========================Index Created ============================//
// // sightings.createIndex({SPECIES_CODE: 1})

// // Sighting of a Bird
// const bird_id = 'abetow'

// bird_sighting = sightings.find(
//     {SPECIES_CODE: bird_id},
//     {location: 1, Year:1, _id:0}
// )

// print('Bird Sightings:')
// print(bird_sighting.toArray().length)


// // result = db.sightings.aggregate([
// //     {
// //         $group: {
// //             _id: '$SPECIES_CODE',
// //             count: { $sum: 1 }
// //         }
// //     },
// //     {
// //         $project: {
// //             _id: 0, // Exclude the _id field from the result
// //             species_code: '$_id',
// //             count: 1
// //         }
// //     },
// //     {
// //         $sort: { count: -1 } // Sort by count in descending order
// //     }
// // ]);

// // result.forEach(res => {
// //     print(res)
// // })


// //Find Bird image

// myfile = bucket.findOne({filename: "Abert's Towhee.jpg"})
// print(myfile)