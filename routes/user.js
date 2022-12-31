const route = require("express").Router();
const User = require("../model/User");
const hashPass = require("./hashPass");
const verifyAdmin = require("./verifyAdmin");
const verifyToken = require("./verifyToken");

// Update Password - - - - - ---->>
route.put("/:id", verifyToken, hashPass, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

// Delete User- - - - - ----->>
route.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.json(error);
  }
});

// Get User - - - - - ----->>
route.get("/find/:id", verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.send("User not found");
    // here we are destructuring password and others from user (user which we are looking for)
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.json(error);
  }
});
// Get all users - - - - - ----->>
route.get("/", verifyAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.json(error);
  }
});
// Get Stats - - - - ------>>
route.get("/stats", verifyAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = route;