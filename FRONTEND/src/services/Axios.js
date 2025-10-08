import axios from "axios";

// const API_URL = "";
// ${API_URL}

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};