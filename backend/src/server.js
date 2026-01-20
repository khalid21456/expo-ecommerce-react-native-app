const express = require("express")
require("dotenv").config()
const {connectDB} = require("./config/db.js");
const ENV = require("./config/env.js");
const {serve} = require("inngest/express")
const {functions,inngest} = require("./config/inngest.js")

const {clerkMiddleware} = reaquire("@clerk/express")

const app = express();

app.use(express.json());
app.use(clerkMiddleware()) // adds auth object under the req => req.auth
app.use("/api/inngest", serve({ client: inngest, functions }));

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


