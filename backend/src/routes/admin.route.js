const express = require("express")
const { createProduct } = require("../controllers/admin.controller.js")
const router = express.Router()

router.post("/products",protectRoute,adminOnly,createProduct)


module.exports = router