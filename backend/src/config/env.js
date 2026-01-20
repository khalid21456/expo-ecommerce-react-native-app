const dotenv = require("dotenv")

dotenv.config()

const ENV = {
    NODE_ENV:process.env.NODE_ENV,
    SERVER_PORT:process.env.SERVER_PORT,
    DB_URL:process.env.DB_URL
}

module.exports = ENV