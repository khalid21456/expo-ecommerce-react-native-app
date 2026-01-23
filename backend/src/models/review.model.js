const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        requird:true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Order",
        requird:true
    },
    rating: {
        type: Number,
        required: true,
        min:1,
        max:5
    }
},{timestamps:true})

exports.Review = mongoose.model("Review",reviewSchema)