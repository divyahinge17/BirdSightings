const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3002;

app.use(cors());

const client = new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
.then(()=> console.log("MongoDB Connected!"))
.catch(err => console.error(err));

const db = client.db('flock');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

app.get('/', async (req, res) => {
    const users = db.collection('users');
    const result = await users.find({}).toArray();
    console.log(result);
    res.send(result);
});

app.get('/stateBoundaries', async (req, res) => {
    const states = db.collection('states');
    const result = await states.find({}).toArray();
    console.log(result);
    res.send(result);
});

app.post('/saveUser', async (req, res) => {
    // const {username, email, password} = req.body;
    console.log(req.body);
    
    const users = db.collection('users');
    const result = await users.insertOne(req.body);
    console.log(result);
    res.send(result);
});

