const User = require("../models/user_model.js")
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");
const mongoose = require("mongoose");

const createUser = async (userData) => {
  try {
    console.log("userData received:", userData);
    let { firstName, lastName, email, password } = userData;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error("The user already exists with email:", email);
    }

    password = await bcrypt.hash(password, 8);

    const newUser = await User.create({ firstName, lastName, email, password });

    if (newUser) {
      console.log("New User added");
    }

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message);
  }
};


async function findUserById(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({email});

    if (!user) {
      throw new Error("user doesnt exists with email:", email);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    // Extract userId from the token
    const userId = await jwtProvider.getUserFromToken(token);
    console.log("Parsed UserID from token from the services:", userId);

    // Check if userId is undefined or null
    if (!userId) {
      throw new Error("UserID is undefined or null");
    }

    // Check if the userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid User ID format");
    }

    // Find the user by ID
    const user = await User.findById(userId);
    console.log("User found:", user);

    // If the user is not found, throw an error
    if (!user) {
      throw new Error(`User not found with ID: ${userId}`);
    }

    // Return the found user
    return user;
  } catch (error) {
    console.error("Error in getUserProfileByToken:", error);
    throw new Error("Error retrieving user profile: " + error.message);
  }
};


const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getUserProfileByToken,
  getAllUsers,
};
