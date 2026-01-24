const express = require("express")
const { protectRoute } = require("../middleware/auth.middleware")
const router = express.Router()
const {
  addAddress,
  addToWishlist,
  deleteAddress,
  getAddresses,
  getWishlist,
  removeFromWishlist,
  updateAddress,
} = require("../controllers/user.controller.js");

router.use(protectRoute)

// address routes
router.post("/addresses", addAddress);
router.get("/addresses", getAddresses);
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);

// wishlist routes
router.post("/wishlist", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);
router.get("/wishlist", getWishlist);

module.exports = router