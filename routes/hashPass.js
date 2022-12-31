const bcrypt = require("bcryptjs");

const hashPass = async (req, res, next) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      next();
    } catch (error) {
      console.log(error);
    }
  }else{
    res.send('Something went wrong')
  }
};

module.exports = hashPass;
