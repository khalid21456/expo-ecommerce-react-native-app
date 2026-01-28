const {requireAuth} = require("@clerk/express")
const {User} = require("../models/user.model.js")
const ENV = require("../config/env.js")

const protectRoute = [
    requireAuth(),
    async (req,res,next) => {
        try{
            const clerkId = req.auth().userId
            if(!clerkId) return res.status(401).json({message:"Unauthorized - invalid token"})
            const user = await User.findOne({clerkId})
            if(!user) return res.status(404).json({message:"User not found"})
            req.user = user
            next()
        }catch(error) {
            console.error(error)
            res.status(500).json({message:"Internal Server Error"})
        }
    }
]

const adminOnly = (req,res,next) => {
    try {
        if(!req.user) {
            return res.status(401).json({message:"Unauthorized - invalid token"})
        }

        if(req.user.email !== ENV.ADMIN_EMAIL) {
            return res.status(403).json({message:"Forbidden - admin access only"})
        }
        next()
    }catch(error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = {adminOnly,protectRoute}