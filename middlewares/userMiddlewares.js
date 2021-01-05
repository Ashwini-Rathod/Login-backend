const User = require("../models/userSchema");
const sendError = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const AppError = require("../helpers/errorClass");

const checkReqBody = (req, res, next)=>{
    let validationArray;
    switch(req.url){
        case "/signin":
            validationArray = ["username","email", "password", "confirmPassword"];
            break;
        case "/login":
            validationArray = ["username", "password"];
            break;
        default:
            return sendError(new AppError(404))
    }
    let result = validationArray.every((key)=>{
        return req.body[key] && req.body[key].trim().length;
    })
    if(!result){
       return sendError(new AppError(400, "Unsuccessful", "Invalid Input"), req, res)
    }
    next();
}
const isEmailValid = (req,res, next)=>{
    let regexForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    let email = req.body.email;
    if(!regexForEmail.test(email)){
        return sendError(new AppError(400, "Unsuccessful", "Invalid Email address"), req, res)
    }
    next();
}

const checkConfirmPassword = (req, res, next)=>{
    if(req.body.password !== req.body.confirmPassword){
        return sendError(new AppError(400, "Unsuccessful", "Passwords do not match"),req, res);
    }
    next();
}

const isEmailUnique = async (req, res, next)=>{
    let user = await User.findOne({email: req.body.email});
    if(user){
        return sendError(new AppError(401, "Unsuccessful", "Email already exists"), req, res);
    }
    next();
}

const isUserNameUnique = async (req,res, next) =>{
    let user = await User.findOne({username: req.body.username});
    if(user){
        return sendError(new AppError(401, "Unsuccessful", "User name already taken. Please select a different username"), req, res);
    }
    next();
}

const isUserRegistered = async (req, res, next)=>{
    try{
        let user = await User.findOne({username: req.body.username});
        if(!user){
            return sendError(
                new AppError(401, "Unsuccesssul", "User not registered"),
                req,
                res,
              );
        }
        req.currentUser = user;
        next();
    }catch(err){
       return sendError(
           new AppError(401, "Unsuccessful", "Internal Error"),
           req,
           res,
       )
    }
}

module.exports.checkReqBody = checkReqBody;
module.exports.isEmailValid = isEmailValid;
module.exports.checkConfirmPassword = checkConfirmPassword;
module.exports.isEmailUnique = isEmailUnique;
module.exports.isUserRegistered = isUserRegistered;
module.exports.isUserNameUnique = isUserNameUnique;