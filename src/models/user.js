const mongoose = require("mongoose")
const validator = require("validator")
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

module.exports = mongoose.model("User", userSchema)    // here the "User" is the name of schema