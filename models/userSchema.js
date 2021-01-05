const mongoose = require("mongoose");
const uniqid = require("uniqid");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uniqid(),
    }, 
    username: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.methods.generateHash = async function (){
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(this.password, salt);
    console.log("generated hash: ", hash);
    return(hash);
}

userSchema.pre("save", async function(next){
    console.log("Implemented");
    console.log(this);
    this.password = await this.generateHash();
    next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;