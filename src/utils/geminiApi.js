import axios from "axios";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`;

export async function fetchAIResponse(messages) {
  try {
    // Convert messages to the format expected by Gemini API
    const contents = messages.map((message) => ({
      role: message.sender === "user" ? "user" : "ai",
      parts: [{ text: message.text }],
    }));

    // Append an instruction to the last user message
    const lastIndex = contents.length - 1;
    if (contents[lastIndex]?.role === "user") {
      contents[
        lastIndex
      ].parts[0].text += `\n\nPlease ensure the response is concise, natural, and human-like, while demonstrating expertise in the field of fashion and clothing. Only answer questions related to fashion and clothes. If the question is outside this field, kindly respond with "I specialize in fashion and clothing, so I can only assist with questions in this area."`;
    }
    const prompt = [
      {
        parts: [
          {
            text: contents,
          },
        ],
      },
    ];
    const response = await axios.post(GEMINI_API_URL, {
      contents: prompt,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error calling Gemini API:",
      error.response?.data || error.message
    );
    throw error;
  }
}
