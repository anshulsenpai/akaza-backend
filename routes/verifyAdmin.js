const jwt = require("jsonwebtoken");
const User = require("../model/User");
const verifyToken = require("./verifyToken");

const verifyAdmin = async (req, res, next) => {
  // checking token first 
  verifyToken(req, res, async () => {
    try {
      // finding user 
      const checkAdmin = await User.findById(req.user.id);
      // checking , if he is admin or not  
      if (checkAdmin.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not allowed to do that!");
      }
    } catch (error) {
      res.json(error);
    }
  });
};

module.exports = verifyAdmin;
