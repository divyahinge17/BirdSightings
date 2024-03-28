import axios from "axios";

export async function saveUser(name, email, password) {
  try {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    const response = await axios.post("http://localhost:3002/saveUser", data);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error Saving data:", error);
  }
}

export async function getStateBoundaries() {
  try {
    const response = await axios.get("http://localhost:3002/stateBoundaries");
    console.log(response.data);
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
