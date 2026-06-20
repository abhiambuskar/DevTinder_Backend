const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require("../middleware/auth")

//POST CONNECTION API
requestRouter.post("/sendConnectionRequest", userAuth, async (req,res) =>{
    try{
        user = req.body
        res.send(user.firstName + " sends connection request")
    }catch(err){
        console.log("Unable to login!!!")
        res.status(400).send("Error: " + err.message)
    }
})


module.exports = requestRouter