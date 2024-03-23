import axios from "axios";

export async function saveUser(username, email, password) {
  try {
    const data = {
        username: username,
        email: email,
        password: password
    }
    const response = await axios.post('http://localhost:3002/saveUser', data);
    console.log(response.data);
  } catch (error) {
    console.error('Error Saving data:', error);
  }
}
