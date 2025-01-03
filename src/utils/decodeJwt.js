import { jwtDecode } from "jwt-decode";

const decodeAccessToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token: ", error);
    return null;
  }
};

export default decodeAccessToken;
