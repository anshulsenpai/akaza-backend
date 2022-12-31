const route = require("express").Router();
const Cart = require("../model/Cart");
const verifyAdmin = require("./verifyAdmin");
const verifyToken = require("./verifyToken");

// creating new cart - - - - ----->>
route.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const saveCart = await newCart.save();
    res.status(200).json(saveCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update cart  - - - ---->>
route.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(403).json(error);
  }
});

// Delete Cart - - - ----->>
route.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Removed from cart");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Find Cart - - - - ------>>
route.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all users 
route.get("/", verifyAdmin, async (req, res) => {
  try {
    const getCart = await Cart.find();
    res.status(200).json(getCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = route