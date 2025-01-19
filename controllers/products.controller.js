const Product = require("../models/product.model")

const getAll = async (req, res) => {
      try {
        const products = await Product.find()
        res.status(200).json(products)
      } catch (error) {
        res.status(500).json({message: error.message})
      }
}

const getOneById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createOne = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateOne = async (req, res) => {
    console.log(req.params)
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


const deleteOne = async (req, res) => {
    try {
       const { id } = req.params
       const product = await Product.findByIdAndDelete(id)
       if(!product){
        return res.status(404).json({message: "Product not found"})
       }
       res.status(200).json({message: "Product deleted successful"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAll,
    getOneById,
    createOne,
    updateOne,
    deleteOne
}