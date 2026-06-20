const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require("../middleware/auth")
const {validateProfileData} = require("../utils/validations")
const bcrypt = require("bcrypt")
const validator = require("validator")
const User = require("../models/user")
//GET Profile data
profileRouter.get("/profile/view", userAuth, async (req, res) =>{
    try{
        const user =  req.user
    
        res.send(user)
        
        
    }catch(err){
        console.log("Unable to login!!!")
        res.status(400).send("Error: " + err.message)
    }
})


profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{

    try{
        if(!validateProfileData){
            throw new Error("Profile data not validated");
        }
        const loggedInUser = req.user
        Object.keys(req.body).forEach((key) =>{
            loggedInUser[key] = req.body[key]
        })

        await loggedInUser.save()
        res.send({
            message: `${loggedInUser.firstName} your profile got updated successfully`,
            data: loggedInUser
        })
    }catch(err){
        res.send("Error: " + err.message)
    }
})


profileRouter.patch("/profile/password", userAuth, async (req, res) =>{

    try{
        const {password} = req.body
        if(!validator.isStrongPassword(password)){
            throw new Error("New Password is not Strong, set another Password");
            
        }

        const newPasswordhash = await bcrypt.hash(password, 10)
       
        const loggedInUser = req.user
        
        loggedInUser.password= newPasswordhash
       

        await loggedInUser.save()
        res.send("Password updated successfully!!!")

    }catch(err){
        res.send("Error: " + err.message)
    }
})



module.exports = profileRouter