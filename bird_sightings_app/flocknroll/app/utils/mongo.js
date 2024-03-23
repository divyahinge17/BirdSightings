import { MongoClient } from 'mongodb';

export default async function dbConnection() {
  const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const database = client.db('flock'); // Choose a name for your database

  console.log(database);

  return database;
}
