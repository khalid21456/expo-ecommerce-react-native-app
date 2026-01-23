const dotenv = require("dotenv")

dotenv.config()

const ENV = {
    NODE_ENV:process.env.NODE_ENV,
    SERVER_PORT:process.env.SERVER_PORT,
    DB_URL:process.env.DB_URL,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
    CLOUDNINARY_API_KEY: process.env.CLOUDNINARY_API_KEY,
    CLOUDNINARY_API_SECRET: process.env.CLOUDNINARY_API_SECRET,
    CLOUDNIRARY_CLOUD_NAME: process.env.CLOUDNIRARY_CLOUD_NAME,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL
}

module.exports = ENV