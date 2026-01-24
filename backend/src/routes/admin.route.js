const express = require("express")
const { createProduct, getAllProducts, updateProduct, getDashboardStats, getAllCustomers, getAllOrders, updateOrderStatus } = require("../controllers/admin.controller.js")
const { protectRoute, adminOnly } = require("../middleware/auth.middleware.js")
const upload = require("../middleware/multer.middleware.js")
const router = express.Router()

// optimization - DRY
router.use(protectRoute,adminOnly)

router.post("/products",upload.array("images",3),createProduct)
router.get("/products",getAllProducts)
router.put("/products/:id",upload.array("images",3),updateProduct)

router.get("/orders",getAllOrders)
router.patch("/orders/:orderId/status", updateOrderStatus)

router.get("customers",getAllCustomers)
router.get("/stats", getDashboardStats)


// PUT: Used for full resource replacement, updating the entire resource
// PATCH: Used for partial resource updates, updating a specific part of the resource

module.exports = router