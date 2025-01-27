import axios from "axios";

export async function saveUser(name, email, password) {
  try {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/saveUser`,
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error Saving data:", error);
  }
}

export async function getStateBoundaries() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/stateBoundaries`
    );

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

    return response.data;
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

export async function getBirdsSightings(query) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/birdSightings?query=${query}`
    );

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

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/getUser`,
      data
    );

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

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/getBirdsByLocation`,
      data
    );

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

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/getImage`,
      data,
      {
        responseType: "blob", // Set responseType to 'blob' to receive binary data
      }
    );

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

export async function saveComment(user, species_code, comment) {
  try {
    const data = {
      user: user,
      species_code: species_code,
      comment: comment,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/saveComment`,
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error Saving comment:", error);
  }
}

export async function getComment(species_code) {
  try {
    const data = {
      species_code: species_code,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/getComment`,
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error getting comments:", error);
  }
}

export async function getBirdById(species_code) {
  try {
    const data = {
      species_code: species_code,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/getBirdById`,
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error getting comments:", error);
  }
}
