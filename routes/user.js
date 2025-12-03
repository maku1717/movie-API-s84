//Dependecies and Modules
const express = require("express");
const userController = require("../controllers/user");

const { verify, verifyAdmin, isLoggedIn } = require("../auth.js");

// routing component
const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/details", verify, userController.retrieveUserDetails);

module.exports = router;
