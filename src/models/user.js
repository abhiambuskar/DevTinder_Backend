const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        maxlength: 50
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Enter a valid Email" + value);
            }
        }
    },
    age:{
        type:Number,
        min:18,

    },
    gender:{
        type:String,
        validate(value){
            if(!["male", "female","others"].includes(value)){
                throw new Error("Gender is not valid");    
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    about:{
        type: String,
        default:"Hi I am cricketer"
    }
},{
    timestamps:true
})

userSchema.methods.getJWT = async function(){
    const user = this

    const token = await jwt.verify({_id: user._id}, "SECRETKEY", {expiresIn: "7d"})
    return token
}

userSchema.methods.validatePassword = async function(UserProvidedPassword){
    const user = this
    const passwordhash = user.password

    const isPasswordValid = await bcrypt.compare(UserProvidedPassword, passwordhash)
    return isPasswordValid
}

module.exports = mongoose.model("User", userSchema)    // here the "User" is the name of schema