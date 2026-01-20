const {v2} = require("cloudinary")

const ENV = require("./config/env.js");

v2.config({
    cloud_name:ENV.CLOUDNIRARY_CLOUD_NAME,
    api_key:ENV.CLOUDNINARY_API_KEY,
    api_secret: ENV.CLOUDNINARY_API_SECRET
})

module.exports = v2