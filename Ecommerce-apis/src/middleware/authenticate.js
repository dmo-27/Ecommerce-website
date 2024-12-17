const jwtProvider = require("../config/jwtProvider");
const User = require("../models/user_model");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).send({ error: "Token not found" });
    }

    console.log(token);
    const userId = await jwtProvider.getUserFromToken(token);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = authenticate;
