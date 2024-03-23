const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); 
const dataSchema = require('./dataSchema'); 
const app = express();

// Enable CORS (optional, adjust based on your needs)
app.use(cors());

// Parse incoming request body data
app.use(bodyParser.json());

const collectionName = 'birds';

app.get('/data', async (req, res) => {
  try {
    const data = await db.collection(collectionName).find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const port = process.env.EXPRESS_PORT;

app.listen(port, () => console.log(`Server listening on port ${port}`));
