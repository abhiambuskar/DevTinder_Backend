const mongoose = require("mongoose")


const connectionRequestSchema = new mongoose.Schema({
    fromUser_Id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUser_Id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        enum:{
           values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrected status type`
        },
        required:true
    }
},{
    timestamps: true
})

connectionRequestSchema.index({fromUser_Id:1})

connectionRequestSchema.pre("save",async function () {
    const connectionRequest = this
    if(connectionRequest.fromUser_Id.equals(connectionRequest.toUser_Id)){
         throw new Error("Cannot send request to yourself");
        
    }
    
})


const ConnectionRequest = mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
)


module.exports = ConnectionRequest