const connection = new Mongo(`localhost:27017`);
db = connection.getDB(`flock`);
sightings1 = db.getCollection(`sightings`);
sightings1.updateMany(
    {},
    [
        {
            $set: {
                location: {
                    $cond: {
                        if: { $or: [
                            { $eq: ["$LONGITUDE",""]},
                            { $eq: ["$LATITUDE",""]},
                            { $eq: ["$LONGITUDE"," "]},
                            { $eq: ["$LATITUDE"," "]}
                        ]},
                        then: null,
                        else: {
                            type: "Point",
                            coordinates: ["$LONGITUDE", "$LATITUDE"]
                        }
                    }
                }
            }
        },
        {
            $unset: ["LONGITUDE","LATITUDE"]
        }
    ]
)