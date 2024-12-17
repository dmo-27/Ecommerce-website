const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const SECRET_KEY = "qwerty@2025";

const generateToken = (userId) => {
  const userIdString = userId.toString(); // Convert ObjectId to string
  console.log("user id is:", userIdString);

  const token = jwt.sign({ userId: userIdString }, SECRET_KEY, {
    expiresIn: "36h",
  });
  console.log("Generated Token:", token);
  return token;
};

const decodeToken = async (token) => {
  try {
    console.log("The arrived token is :", token);
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded Token:", decoded);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    console.log(currentTimestamp, "the currenttimestamp");
    console.log(decoded.exp, "the token expiration timestamp");
    if (decoded.exp < currentTimestamp) {
      console.error("Token has expired");
      throw new Error("Token has expired");
    }
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log(error.message);
      console.error("Token has expired");
      // You could trigger a token refresh here if you implement that mechanism
    } else {
      console.error("Token verification failed:", error.message);
    }
    return null;
  }
};

const getUserFromToken = (token) => {
  try {
    console.log("Attempting to decode token:", token);

    const decodedToken = jwt.verify(token, SECRET_KEY);
    console.log("Decoded Token:", JSON.stringify(decodedToken, null, 2));

    const tokenIssuedAt = new Date(decodedToken.iat * 1000).toISOString();
    console.log("Token issued at:", tokenIssuedAt);

    const tokenExpiresAt = new Date(decodedToken.exp * 1000).toISOString();
    console.log("Token expires at:", tokenExpiresAt);

    if (!decodedToken.userId) {
      throw new Error("UserID is undefined or null");
    }

    console.log("Parsed UserID from token:", decodedToken.userId);
    return decodedToken.userId;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Token has expired. Please refresh your token.");
      // Here you could trigger a token refresh mechanism
    } else {
      console.error("Error in getUserFromToken:", error.message);
    }
    console.error("Error stack:", error.stack);
    throw new Error("Invalid token: " + error.message);
  }
};

module.exports = { generateToken, getUserFromToken };
