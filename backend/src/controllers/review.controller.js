const { Order } = require("../models/order.model.js")
const { Review } = require("../models/review.model.js")
const { Product } = require("../models/product.model.js")


const createReview = async (req, res) => {
    try {
        const { productId, orderId, rating } = req.body
        if (!rating || rating < 1 || rating > 5) {
            res.status(400).json({ message: "rating must be between 1 and 5" })
        }

        const order = await Order.findById(orderId)
        if (!order) {
            res.status(404).json({ message: "Order not found" })
        }

        if (order.clerkId !== user.clerkId) {
            return res.status(403).json({ error: "Not authorized to review this order" });
        }

        if (order.status !== "delivered") {
            return res.status(400).json({ error: "Can only review delivered orders" });
        }

        // verify product is in the order
        const productInOrder = order.orderItems.find(
            (item) => item.product.toString() === productId.toString()
        );
        if (!productInOrder) {
            return res.status(400).json({ error: "Product not found in this order" });
        }

        // check if review aleardy exist
        const existingReview = await Review.findOne({ productId, userId: req.user._id })
        if (!existingReview) return res.status(400).json({ message: "You have aleardy reviewed this product", success: false })

        // create the review
        const review = await Review.create({ productId, userId: req.user._id, orderId, rating })

        // update the product rating
        const reviews = await Review.find({ productId });
        const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                averageRating: totalRating / reviews.length,
                totalReviews: reviews.length,
            },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            await Review.findByIdAndDelete(review._id);
            return res.status(404).json({ error: "Product not found" });
        }


        res.status(200).json({
            message: "Review created",
            success: true,
            data: review
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error creating review",
            error: error.message,
        });
    }
}

const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params
        const review = await Review.findById(reviewId)
        if(!review) res.status(404).json({message:"Review not found !",success:false})
        if(req.user._id !== review.userId) res.status(403).json({message:"Not authorized to delete this review",success:false})
        const productId = review.productId
        await Review.findByIdAndDelete({ reviewId })
        const reviews = await Review.find({ productId });
        const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                averageRating: totalRating / reviews.length,
                totalReviews: reviews.length,
            },
            { new: true, runValidators: true }
        );
        res.status(201).json({ message: "review deleted successfully", success: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error deleting review",
            error: error.message,
        });
    }
}


module.exports = { createReview, deleteReview }