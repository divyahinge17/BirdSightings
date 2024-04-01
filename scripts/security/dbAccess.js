// Creating Admin User and granting any database access
const conn = new Mongo(`mongodb://localhost:27017/`);

db = conn.getDB("admin");
// db.system.roles.deleteMany({});
// db.dropUser('admin_user');
db.createUser({
    user: "admin_user",
    pwd: "FlockNRoll@777",
    roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
  });
conn.close();

//logging in as admin user and connecting to flock
conn = new Mongo("mongodb://admin_user:FlockNRoll@777@localhost:27017/");
db = conn.getDB("flock");
// db.dropUser('mongoapp');
//creating empty collections 
db.createCollection("comments");
db.createCollection("users");

//creating roles based on collection wise privilages
db.createRole({
    role: "readOnlyCollections",
    privileges: [
      { resource: { db: "flock", collection: "birds" }, actions: ["find"] },
      { resource: { db: "flock", collection: "sightings" }, actions: ["find"] },
      { resource: { db: "flock", collection: "states" }, actions: ["find"] },
      { resource: { db: "flock", collection: "states_lowres" }, actions: ["find"] },
      { resource: { db: "flock", collection: "fs.files" }, actions: ["find"] },
      { resource: { db: "flock", collection: "fs.chunks" }, actions: ["find"] }
    ],
    roles: []
  });

db.createRole({
    role: "readWriteCollections",
    privileges: [
    { resource: { db: "flock", collection: "users" }, actions: ["find","insert"] },
    { resource: { db: "flock", collection: "comments" }, actions: ["find","insert"] }
    ],
    roles: []
});


//creating new user
db.createUser({
    user: "mongoapp",
    pwd: "huMONGOu5",
    roles: [{ role: "readOnlyCollections", db: "flock" }, { role: "readWriteCollections", db: "flock" }]
  });
print("Users mongoapp created successfully!");

conn.close();


//Useful commands:
//sudo service mongod stop
//sudo service mongod start
//ps aux | grep mongod


