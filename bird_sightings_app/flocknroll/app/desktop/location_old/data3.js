// Assuming axios is imported properly
import axios from 'axios';

export async function states() {
  try {
    const response = await axios.get('http://localhost:3002/states');
    return response.data;
  } catch (error) {
    console.error('Error getting states data:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}

states()
  .then(data => {
    // Check the data type
    if (typeof data === 'object') {
      if (Array.isArray(data)) {
        console.log('Data is an array');
      } else {
        console.log('Data is an object');
      }
    } else {
      console.log('Data is of another type');
    }

    // Example: Displaying the first few items of the data
    console.log('Data:', data.slice(0, 5)); // Displaying first 5 items as an example
  })
  .catch(error => {
    console.error('Error:', error);
  });