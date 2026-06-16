const validator = require("validator")

const validateData =  (req) =>{
    const {firstName, lastName, email, password} = req.body
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

module.exports = {validateData}