const conn = new Mongo(`localhost:27017`),
    db = conn.getDB(`flock`),
    sightings = db.getCollection(`sightings`),
    birds = db.getCollection(`birds`),
    sites = db.getCollection(`sites`);
    states = db.getCollection(`states`);
    users = db.getCollection(`users`);
    
const bucket = new conn.GridFSBucket(db);


sightings.createIndex({SPECIES_CODE: 1})
sightings.createIndex({SUBNATIONAL1_CODE: 1, SPECIES_CODE: 1});
sightings.createIndex({location: "2dsphere"});