const { MongoClient } = require('mongodb');

const connectionString = process.env.MONGODB_URI;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect()
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const db = client.db('<your_database_name>'); 

module.exports = db;
