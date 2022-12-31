const route = require("express").Router();
const Product = require("../model/Product");
const verifyAdmin = require("./verifyAdmin");

// creating new product - - - - ----->>
route.post("/", verifyAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Updating product - - - - ----->>
route.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(403).json(error);
  }
});

// Deleting product - - - - - ------>>
route.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Find product - - - - ------>>
route.get("/find/:id", verifyAdmin, async (req, res) => {
  try {
    const productResult = await Product.findById(req.params.id);
    res.status(200).json(productResult)
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all products  - - - - - ----->>
route.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    
    try {
        // check for newly added products 
        if(qNew){
            products = await Product.find().sort({createdAt : -1}).limit(2)
        }else if(qCategory){
            products = await Product.find({category : qCategory})
        }else {
            products = await Product.find();
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = route;
