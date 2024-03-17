const connection = new Mongo(`localhost:27017`);
db = connection.getDB(`flock`);
sightings1 = db.getCollection(`sightings`);

sightings1.aggregate([{$out: "sightings2"}]);
