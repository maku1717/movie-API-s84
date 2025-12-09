const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const auth = require("../auth.js");
const { errorHandler } = require("../auth.js");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  try {
    if (!req.body.email.includes("@")) {
      return res.status(400).send({ message: "Email invalid" });
    } else if (req.body.password < 8) {
      return res
        .status(400)
        .send({ message: "Password must be atleast 8 characters" });
    }

    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    await newUser.save();

    return res.status(201).send({ message: "Register Successfully" });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    if (!req.body.email.includes("@")) {
      return res.status(400).send({ message: "Email Invalid" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: "Email not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "incorrect email or password" });
    }

    return res.status(200).send({
      message: "User logged in successfully",
      access: auth.createAccessToken(user),
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

module.exports.retrieveUserDetails = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ message: "Authentication token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ user });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

module.exports.getWorkouts = async (req, res) => {};
