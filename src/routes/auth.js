const express = require("express")
const authRouter = express.Router()
const {userAuth} = require("../middleware/auth")
const {validateData} = require("../utils/validations")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt =  require("jsonwebtoken")
const User = require("../models/user")

//POST SIGNUP API to add user
authRouter.post("/signup", async (req, res) =>{
    //console.log(req.body)

    try{
        validateData(req)
        const {firstName, lastName, email, password, age} = req.body

        const passwordhash = await bcrypt.hash(password, 10)
        console.log(passwordhash)

        const user = new User({
            firstName,
            lastName,
            email,
            age,
            password: passwordhash
        })

        //const user = User(req.body)

        await user.save()
        res.send("User added successfully")
    }catch(err){
        console.log("Unable to add user data !!!")
        res.status(400).send("Error: " + err.message)
    }
})

//POST LOGIN API
authRouter.post("/login", async (req, res) =>{
    try{
        const {email, password} = req.body

        const user = await User.findOne({email: email})
        if(!user){
            throw new Error("Invalid Credentails");
        }

        const isPasswordValid = await user.validatePassword(password)

        if(isPasswordValid){
            const token = await user.getJWT()
            res.cookie("token", token)
            
            res.send("Login Successfully")
        }else{
            throw new Error("Incorrect Password")
        }

    }catch(err){
        console.log("Unable to login!!!")
        res.status(400).send("Error: " + err.message)
    }
})

//POST LOGOUT API
authRouter.post("/logout", async (req, res) =>{
    res.cookie("token", null,
        {
            expires: new Date(Date.now())
        }
    )
    res.send("Logout Successfully!!!")
})


module.exports = authRouter