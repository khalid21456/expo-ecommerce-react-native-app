const mongoose = require("mongoose")

const addresseSchema = new mongoose.Schema({
    label:{
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    streetAdress : {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean,
        required: true,
    }
})


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: ""
    },
    clerkId: {
        type: String,
        unique: true,
        required: true,
    },
    addresses: [addresseSchema],
    // [1,2,3,4]
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
},{timestamps:true})

exports.User = mongoose.model("User", userSchema)