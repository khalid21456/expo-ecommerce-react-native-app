const express = require("express")
const { createProduct } = require("../controllers/admin.controller.js")
const { protectRoute, adminOnly } = require("../middleware/auth.middleware.js")
const upload = require("../middleware/multer.middleware.js")
const router = express.Router()

// optimization - DRY
router.use(protectRoute,adminOnly)

router.post("/products",upload.array("images",3),createProduct)
router.get("/products",getAllProducts)
router.put("/products/:id",upload.array("images",3),updateProduct)


module.exports = router