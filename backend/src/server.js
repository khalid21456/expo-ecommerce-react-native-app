const express = require("express")
require("dotenv").config()
const {connectDB} = require("./config/db.js")

const app = express();
const dirname = path.resolve()
app.get("/",(req,res)=> {
    res.status(200).json({message:"Good Job !"})
})


// make our app ready for deployment

if(ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(dirname,"..","admin","dist")))
    app.get("/{*any}",(req,res) => {
        res.sendFile(path.join(dirname,"..","admin","dist","index.html"));
    });
}

app.listen(ENV.SERVER_PORT,() => {
    console.log("App is running");
    connectDB()
})


