const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // reading token from headers 
  const token = req.header("auth-token")
  if(!token) return res.status(400).json("You are not authenticated")
  try {
    // verifying token 
    const verifyUser = jwt.verify(token, process.env.JWT_SEC_KEY)
    req.user = verifyUser
    next();
  } catch (error) {
    res.send("Invalid Token")
    console.log(error)
  }
}

module.exports = verifyToken;
