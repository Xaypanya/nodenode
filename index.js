require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = process.env.PORT
const MONGO_DB = process.env.MONGO_DB

app.listen(PORT, ()=> {
    console.log(`🦖 Server is running on http://localhost:${PORT}`)
})

mongoose.connect(MONGO_DB).then(()=>{
    console.log("✅ Connected to Database Success")
})
.catch((err)=>{
    console.log("❌ Connect to Database Failed: ", MONGO_DB)
    console.log(err)
})

app.get('/', (req, res) => {
    res.send("Sawasdee From NodeNode")
})
