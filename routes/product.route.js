const express = require("express");
const router = express.Router();

const { getAll, getOneById, createOne, updateOne, deleteOne } = require("../controllers/products.controller");

router.get("/", getAll);
router.get("/:id", getOneById)
router.post("/", createOne)
router.put("/:id", updateOne)
router.delete("/:id", deleteOne)

module.exports = router
