import axios from "axios";

export async function saveUser(name, email, password) {
  try {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    const response = await axios.post("http://localhost:3002/saveUser", data);
    //console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error Saving data:", error);
  }
}

export async function getStateBoundaries() {
  try {
    const response = await axios.get("http://localhost:3002/stateBoundaries");
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

export async function getBirdsByName(query) {
  try {
    const response = await axios.get(
      `http://localhost:3002/searchBird?query=${query}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

export async function getBirdsByDescription(query) {
  try {
    const response = await axios.get(
      `http://localhost:3002/searchDescription?query=${query}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

export async function getBirdsSigntings(query) {
  try {
    const response = await axios.get(
      `http://localhost:3002/birdSightings?query=${query}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

export async function getUser(email, password) {
  try {
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post("http://localhost:3002/getUser", data);

    return response.data;
  } catch (error) {
    console.error("Error Saving data:", error);
  }
}

export async function getBirdsByLocation(stateId) {
  try {
    const data = {
      stateId: stateId,
    };
    // console.log(data)

    const response = await axios.post(
      "http://localhost:3002/getBirdsByLocation",
      data
    );
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching birds data:", error);
  }
}

export async function getImage(birdName) {
  try {
    const data = {
      birdName: birdName,
    };
    //console.log(data);

    const response = await axios.post("http://localhost:3002/getImage", data, {
      responseType: "blob", // Set responseType to 'blob' to receive binary data
    });

    //console.log(response.status);
    return response.data;
  } catch (error) {
    console.log("Error fetching bird image:", error);
    return "Image Not Found!"; // Return null in case of error
  }
}

export async function getStateCoord(stateId) {
  try {
    const data = {
      stateId: stateId,
    };
    const response = await axios.post(
      "http://localhost:3002/getstatecoord",
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error getting state co-ordinates:", error);
  }
}

export async function getSightings(stateId, speciesCode) {
  try {
    const data = {
      stateId: stateId,
      speciesCode: speciesCode,
    };

    const response = await axios.post(
      "http://localhost:3002/getSightings",
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error getting sightings::", error);
  }
}
