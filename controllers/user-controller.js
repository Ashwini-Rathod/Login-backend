const User = require("../models/userSchema");
const sendError = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const AppError = require("../helpers/errorClass");
const bcrypt = require("bcryptjs");
const { generatetoken }= require("../helpers/jwt-token");

const signUpUser = async (req, res)=>{
   let newUser = new User({
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
   })
   try{
       let user = await newUser.save();
       sendResponse(200, "Successful", [user], req, res);
    }catch(err){
        sendError(new AppError(401, "Unsuccessful", "Internal Error"), req,res);
    }
   
}

const loginUser = async (req, res, next)=>{
    try{
        let compare = await bcrypt.compare(req.body.password, req.currentUser.password);
        if(!compare){
            return sendError(new AppError(401, "Unsuccessful", "Incorrect Password"),req, res);
        }
        let jwtToken = await generatetoken({ username: req.currentUser.username}, process.env.JWT_SECRET, { expiresIn: "1d"});
        res.cookie("jwt", jwtToken); 
        res.status(200).json({
            status: "Successful",
            data: [{
                jwt: jwtToken,
            }]
        })
    }  
    catch(err){
        console.log(err);
        return sendError(new AppError(500, "Unsucessful", "Internal Error"),req, res);
    }
}

module.exports.signUpUser = signUpUser;
module.exports.loginUser = loginUser;



