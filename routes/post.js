const verifyToken = require("./verifyToken");

const route = require("express").Router();

route.post("/", verifyToken, (req, res) => {
  res.json({
    title: req.body.title,
    desc: req.body.desc,
    content: req.body.content,
  });
});

module.exports = route;
