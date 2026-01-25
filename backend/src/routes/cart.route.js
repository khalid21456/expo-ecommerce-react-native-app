const express = require("express")
const { protectRoute } = require("../middleware/auth.middleware")
const router = express.Router()
const {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} = require("../controllers/cart.controller.js");

router.use(protectRoute)

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:productId", updateCartItem);
router.delete("/:productId", removeFromCart);
router.delete("/", clearCart);

module.exports = router