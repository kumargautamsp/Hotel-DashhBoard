import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/api/data`);
    console.log("Data fetched successfully:");
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}

export default fetchData;
