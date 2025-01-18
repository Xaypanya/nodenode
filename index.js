require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())

const Product = require('./models/product.model')

const PORT = process.env.PORT
const MONGO_DB = process.env.MONGO_DB

mongoose.connect(MONGO_DB).then(()=>{
    console.log("✅ Connected to Database Success")
})
.catch((err)=>{
    console.log("❌ Connect to Database Failed: ", MONGO_DB)
    console.log(err)
})

app.listen(PORT, ()=> {
    console.log(`🦖 Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send("Welcome to NodeNode API Service")
})

app.post('/api/products', async (req, res)=> {
    try {
       const product = await Product.create(req.body)
       res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})