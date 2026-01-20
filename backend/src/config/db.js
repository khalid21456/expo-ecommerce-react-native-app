const mongoose = require("mongoose")
const  ENV  = require("./env.js");


exports.connectDB = async() => {
    try {
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log(`Connected to MONGODB: ${conn.connection.host}`)
    }catch(error) {
        console.error("MONGODB CONNECTION ERROR")
        process.exit(1); // exit code 1 means failure, 0 means success
    }
}