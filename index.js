require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

const productRoutes = require("./routes/product.route")

//routes
app.use("/api/products", productRoutes)


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
