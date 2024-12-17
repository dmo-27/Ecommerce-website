const userServices = require("../services/user_services");
const jwtProvider = require("../config/jwtProvider");
const cartService = require("../services/cart_services");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    console.log("Register request received:", req.body);

    // Ensure userServices and other services are imported and initialized correctly
    const user = await userServices.createUser(req.body);
    if (!user) {
      throw new Error("User creation failed");
    }

    //console.log("the user id is ",user._id);

  //  const userIdString = user._id.toJSON();

   const jwt = jwtProvider.generateToken(user._id);
   console.log("Generated JWT:", jwt);
    await cartService.createCart(user);

    //console.log("User registered successfully:", user._id);
    return res.status(200).send({ jwt, message: "Register success" });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res
      .status(500)
      .send({ message: "Registration failed", error: error.message });
  }
};


const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userServices.findUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .send({ message: "user not found with email:", email });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).send({ message: "The password is invalid" });
    }

    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: "login success" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { login, register };
