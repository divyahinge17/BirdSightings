import axios from "axios";

export async function saveUser(name, email, password) {
  try {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/saveUser`, data);
    //console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error Saving data:", error);
  }
}

export async function getStateBoundaries() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/stateBoundaries`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

export async function getBirdsByName(query) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/searchBird?query=${query}`
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
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/searchDescription?query=${query}`
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
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/birdSightings?query=${query}`
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
    console.log(process.env.NEXT_PUBLIC_ENDPOINT_URL)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/getUser`, data);

    return response.data;
  } catch (error) {
    console.log("Error Saving data:", error);
  }
}

export async function getBirdsByLocation(stateId) {
  try {
    const data = {
      stateId: stateId,
    };
    // console.log(data)

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/getBirdsByLocation`,
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

    const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/getImage`, data, {
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
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/getstatecoord`,
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
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/getSightings`,
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error getting sightings::", error);
  }
}
