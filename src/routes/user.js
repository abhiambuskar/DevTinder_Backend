const express = require("express")
const userRouter = express.Router()
const {userAuth} = require("../middleware/auth")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

const USER_SAFE_DATA = "firstName lastName"


userRouter.get("/user/requests/pending", userAuth, async (req, res) =>{

    try{
        const loggedInUser = req.user;

        const pendingRequests = await ConnectionRequest.find({
            toUser_Id:loggedInUser._id,
            status: "interested"
        }).populate("fromUser_Id", "firstName lastName")

        res.send({message: "Following are the pending requests",
            data: pendingRequests  
        })
    }catch(err){
        res.send("ERROR: " + err.message)
    }

})


userRouter.get("/user/connections", userAuth, async (req, res) =>{
    try{
        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUser_Id:loggedInUser._id, status:"accepted"},
                {toUser_Id:loggedInUser._id, status:"accepted"}
            ],
        }).populate("fromUser_Id", USER_SAFE_DATA )
        .populate("toUser_Id", USER_SAFE_DATA )

        console.log(connectionRequests)
        const data = connectionRequests.map((row)=>{
            if(row.fromUser_Id._id.toString() === loggedInUser._id.toString()){
                return row.toUser_Id
            }
            return row.fromUser_Id
        })

        res.send({message: "Following are the connections",
            data: connectionRequests
        })

    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})

userRouter.get("/feed", userAuth , async (req, res) =>{
    try{

        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1)*limit

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUser_Id: loggedInUser._id},
                {toUser_Id: loggedInUser._id}
            ]
        }).select("fromUser_Id toUser_Id")

        const hideUserfromFeed = new Set()
        connectionRequests.forEach((req)=>{
            hideUserfromFeed.add(req.fromUser_Id.toString())
            hideUserfromFeed.add(req.toUser_Id.toString());
        })

        const users = await User.find({
            $and:[
                {_id: {$nin: Array.from(hideUserfromFeed)}},
                {_id: {$ne: loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit)

        res.send(users)

    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})


module.exports = userRouter