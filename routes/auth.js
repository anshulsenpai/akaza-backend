const route = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const hashPass = require("./hashPass");

dotenv.config();

// for registration
route.post("/register", hashPass, async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });
    const savedUser = await newUser.save();
    res.send(`User Signed in ${savedUser}`);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// for login
route.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("User Not Found");
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !checkPassword && res.status(500).json("Invalid username and password");
    // Create Token - - - - ---->
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC_KEY,
      { expiresIn: "15d" }
    );
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, token });
    console.log({ ...other, token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
