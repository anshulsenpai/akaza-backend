const route = require("express").Router();
const Order = require("../model/Order");
const verifyAdmin = require("./verifyAdmin");
const verifyToken = require("./verifyToken");

// creating new Order - - - - ----->>
route.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Order  - - - ---->>
route.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(403).json(error);
  }
});

// Delete Order - - - ----->>
route.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order is Cancelled");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Find Cart - - - - ------>>
route.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all users
route.get("/", verifyAdmin, async (req, res) => {
  try {
    const getOrders = await Order.find();
    res.status(200).json(getOrders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get monthly income - - - - - ------>>
route.get("/income", verifyAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = route;
