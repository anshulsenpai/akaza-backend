const Card = require("../model/Card");
const verifyToken = require("./verifyToken");

const route = require("express").Router();

route.get("/", verifyToken, async (req, res) => {
  try {
    const getCard = await Card.find({ userId: req.body.userId });
    res.send(getCard);
  } catch (error) {
    console.log(error);
  }
});

route.post("/", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    const getCardData = new Card(req.body);
    const savedCardData = await getCardData.save();
    res.status(200).json(savedCardData);
  } catch (error) {
    res.status(500).json(error);
  }
});

route.put("/:id", verifyToken, async (req, res) => {
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

module.exports = route;
