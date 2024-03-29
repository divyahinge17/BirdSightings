const conn = new Mongo(`localhost:27017`),
    db = conn.getDB(`flock`),
    sightings = db.getCollection(`sightings`),
    birds = db.getCollection(`birds`),
    sites = db.getCollection(`sites`);
    states = db.getCollection(`states`);
    users = db.getCollection(`users`);


   //get state polygon
const stateData = db.states.findOne({ STUSPS: 'WY' });
const stateGeometry = stateData.geometry;
const coord = stateGeometry.coordinates;

const uniqueValuesSet = new Set();

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

}



print(uniqueValuesSet);
