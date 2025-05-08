import axios from "axios";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`;

export async function fetchAIResponse(promptText) {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [{ text: promptText }],
        },
      ],
    });

    const result = response.data;
    return result;
  } catch (error) {
    console.error(
      "Error calling Gemini API:",
      error.response?.data || error.message
    );
    throw error;
  }
}
