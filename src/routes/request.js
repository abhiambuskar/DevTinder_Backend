const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require("../middleware/auth")
const ConnectionRequest = require("../models/connectionRequest")
const { Connection } = require("mongoose")

//POST CONNECTION API
requestRouter.post("/request/send/:status/:userid", userAuth, async (req,res) =>{
    try{
        const fromUser_Id = req.user._id
        const toUser_Id = req.params.userid
        const status = req.params.status

        const allowedStatus = ["interested", "ignored"]
        if(!allowedStatus.includes(status)){
            return res.send("Invalid status types "+ status)
        }
        const connectionRequest = new ConnectionRequest({
            fromUser_Id,
            toUser_Id,
            status
        })

        const ExistingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUser_Id, toUser_Id},
                {fromUser_Id:toUser_Id, toUser_Id:fromUser_Id}
            ]
        })


        if(ExistingConnectionRequest){
            return res.status(400).send("Connection Request already exists!!!")
        }


        const data = await connectionRequest.save()
        res.json({
            message:"Connection request sent successfully",
            data 
        })
        res.send(user.firstName + " sends connection request")
    }catch(err){

        res.status(400).send("Error: " + err.message)
    }
})


module.exports = requestRouter