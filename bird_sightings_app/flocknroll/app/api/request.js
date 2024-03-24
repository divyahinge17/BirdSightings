import axios from "axios";

export async function saveUser(name, email, password) {
  try {
    const data = {
      name: name,
      email: email,
      password: password
    }
    const response = await axios.post('http://localhost:3002/saveUser', data);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error Saving data:', error);
  }
}

export async function getUser(email, password) {
  try {
    const data = {
      email: email,
      password: password
    }
    console.log(data)
    const response = await axios.post('http://localhost:3002/getUser', data);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error Saving data:', error);
  }
}