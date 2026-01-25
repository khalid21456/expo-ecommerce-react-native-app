const express = require("express")
const { protectRoute } = require("../middleware/auth.middleware");
const { getAllProducts, getProductById } = require("../controllers/product.controller");
const router = express.Router()


router.use(protectRoute)

router.get("/", getAllProducts);
router.get("/:id", getProductById);


module.exports = router