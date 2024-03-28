const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, GridFSBucket } = require("mongodb");

const app = express();
const port = 3002;

app.use(cors());

const client = new MongoClient("mongodb://172.22.32.1:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client
  .connect()
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

const db = client.db("flock");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);

app.get("/", async (req, res) => {
  const users = db.collection("users");
  const result = await users.find({}).toArray();
  res.send(result);
});

app.get("/searchDescription", async (req, res) => {
  const { query } = req.query;
  const birds = db.collection("birds2");
  const result = await birds
    .find(
      {
        bird_description: { $regex: query, $options: "i" }, // Case-insensitive search
      },
      { _id: 0 }
    )
    .toArray();
  console.log(result);
  res.send(result);
});

app.get("/searchBird", async (req, res) => {
  const { query } = req.query;
  const birds = db.collection("birds2");
  const result = await birds
    .find(
      {
        american_english_name: { $regex: query, $options: "i" }, // Case-insensitive search
      },
      { _id: 0 }
    )
    .toArray();
  console.log(result);
  res.send(result);
});

app.get("/birdSightings", async (req, res) => {
  const { query } = req.query;
  console.log(query);
  const sightings = db.collection("sightings");
  const result = await sightings
    .find({
      SPECIES_CODE: query,
    })
    .toArray();
  console.log(result);
  res.send(result);
});

app.get("/stateBoundaries", async (req, res) => {
  const states = db.collection("states");
  const result = await states.find({}).toArray();
  console.log(result);
  res.send(result);
});

app.post("/saveUser", async (req, res) => {
  data = req.body;

  if (!data.name || !data.email || !data.password) {
    res.send("Invalid SignUp Request!");
  } else {
    const users = db.collection("users");
    const fetchUser = await users.findOne({
      email: data.email,
    });

    if (!fetchUser) {
      const result = await users.insertOne({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      res.send("User Created!");
    } else {
      res.send("User with provided Email already exists!");
    }
  }
});

app.post("/getUser", async (req, res) => {
  data = req.body;

  if (!data.email || !data.password) {
    res.status(400).json({ message: "Invalid Login Request!" });
  } else {
    const users = db.collection("users");
    const result = await users.findOne({
      email: data.email,
      password: data.password,
    });

    if (!result) {
      res.status(401).json({ message: "Invalid User Credentials!" });
    } else {
      res.status(200).json({ message: "Login Successful!", data: result });
    }
  }
});

app.post("/getBirdsByLocation", async (req, res) => {
  const data = req.body;
  // console.log(req)
  //console.log(data);

  //use data.stateId

  const sightings = db.collection("sightings");
  const birds = db.collection("birds");
  const states = db.collection("states");

  try {
    const stateResult = await states.findOne({ STUSPS: data.stateId });

    if (!stateResult) {
      return res.status(404).send("State not found");
    }

    const stateGeometry = stateResult.geometry;
    const coord = stateGeometry.coordinates;
    const uniqueValuesSet = new Set();

    if (stateGeometry.type == "Polygon") {
      const sightingsWithinPolygon = await sightings
        .aggregate([
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
      await Promise.all(
        coord.map(async (polygon) => {
          const sightingsWithinPolygon = await sightings
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
        })
      );
    }

    const uniqueValuesArray = Array.from(uniqueValuesSet);

    const birdDetails = await birds
      .find({ species_code: { $in: uniqueValuesArray } })
      .toArray();

    console.log("Length: " + birdDetails.length);

    res.send(birdDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.post("/getImage", async (req, res) => {
  data = req.body;
  console.log(data);

  try {
    const bucket = new GridFSBucket(db);

    const filesCollection = db.collection("fs.files");
    // const fileId = new ObjectId(req.params.id);

    const image = await filesCollection.findOne({
      filename: `${data.birdName}.jpg`,
    });

    if (!image) {
      res.status(404).json({ message: "Image not found!" });
    } else {
      const downloadStream = bucket.openDownloadStream(image._id);

      downloadStream.on("error", () => {
        res.status(404).json({ message: "Image not found!" });
      });

      downloadStream.on("data", (chunk) => {
        res.write(chunk);
      });

      downloadStream.on("end", () => {
        res.end();
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Image!" });
  }
});

app.post("/getstatecoord", async (req, res) => {
  const data = req.body;
  if (!data.stateId) {
    res.status(400).json({ message: "Invalid State Code!" });
  } else {
    const states = db.collection("states");
    const result = await states.findOne({ STUSPS: data.stateId });
    res.send(result);
  }
});

app.post("/getSightings", async (req, res) => {
  const data = req.body;
  //console.log(data);
  if (!data.stateId) {
    res.status(400).json({ message: "Invalid State Code!" });
  } else {
    try {
      const sightings = db.collection("sightings");
      const result = await sightings
        .find(
          {
            SUBNATIONAL1_CODE: "US-" + data.stateId,
            SPECIES_CODE: data.speciesCode,
          },
          {
            projection: {
              Year: 1,
              location: 1,
              _id: 0,
            },
          }
        )
        .toArray();
      //console.log(result);
      res.json(result);
    } catch (error) {
      console.error("Error fetching sightings:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});
