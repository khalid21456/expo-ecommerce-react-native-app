const express = require("express")
const { protectRoute } = require("../middleware/auth.middleware");
const { createReview, deleteReview} = require("../controllers/review.controller");
const router = express.Router()


router.use(protectRoute)

router.post("/", createReview);
// we did not implement this function in the mobile app - in the frontend
// but jic if you'd like to see the backend code here it is - i provided
router.delete("/:reviewId", deleteReview);

module.exports = router