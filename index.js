require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const Product = require("./models/product.model");

const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB;

mongoose
  .connect(MONGO_DB)
  .then(() => {
    console.log("✅ Connected to Database Success");
  })
  .catch((err) => {
    console.log("❌ Connect to Database Failed: ", MONGO_DB);
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`🦖 Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to NodeNode API Service");
});

//Product:: Get all
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Product:: Get one
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product){
        return res.status(404).json({message: "Product not found"})
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Product:: Create
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Product:: Update
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
    if(!product){
        return res.status(404).json({message: "Product not found"})
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Product:: Delete
app.delete("/api/products/:id", async (req, res)=>{
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json("Product not found")
        }
        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
