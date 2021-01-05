const jwt = require("jsonwebtoken");
const util = require("util");
const secret = "Some secret";
const payload = {
    email: "some@gmail.com"
}

jwt.sign(payload, secret, {expiresIn : "1h"} ,(err, token)=>{
    if(err){
        console.log(err);
        return err;
    }
    console.log(token);
})