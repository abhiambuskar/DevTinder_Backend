const validator = require("validator")

const validateData =  (req) =>{
    const {firstName, lastName, email, password,age} = req.body
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }else if(firstName.lenght < 4 && firstName.lenght > 50){
        throw new Error("Name is not valid")
    }else if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
}


const validateProfileData = (req) =>{
    const allowedEditFields = ["firstName", "lastName", "email", "about", "age"]

    const isEditAllowed = Object.keys(req.body).every((field)=>{
        allowedEditFields.includes(field)
    })
    return isEditAllowed
}
module.exports = {validateData, validateProfileData}