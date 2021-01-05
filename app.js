const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const app = express();
dotenv.config({path: "./config.env"});
// const { protectRoute } = require("./middlewares/protectRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true , useNewUrlParser: true },(err, connection)=>{
    if(err){
        console.log(err);
    }
    console.log("Successfully connected to the database");       
})
app.get("/", (req,res)=>{
    res.json({
        message: "There is nothing on this page",
    })
})
app.use("/users", userRouter);
app.listen(process.env.PORT, ()=>{
    console.log("Listening to the port")
})


