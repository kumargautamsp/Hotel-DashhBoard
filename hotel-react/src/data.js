import axios from "axios";

async function fetchData() {
  try {
    console.log(process.env.BACKEND_URL)
    const backendUrl = process.env.BACKEND_URL || 'https://hotel-dashhboard.onrender.com';
    const response = await axios.get(`${backendUrl}/api/data`);
   
    console.log("Data fetched successfully:",response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}

export default fetchData;

