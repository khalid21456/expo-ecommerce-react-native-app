const express = require("express")
const { protectRoute } = require("../middleware/auth.middleware");
const { createOrder, getUserOrders } = require("../controllers/order.controller");
const router = express.Router()

router.use(protectRoute)

router.post("/", createOrder);
router.get("/", getUserOrders);

module.exports = router
