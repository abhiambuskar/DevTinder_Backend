const jwt = require("jsonwebtoken")
const User = require("../models/user")
const cookieParser = require("cookie-parser")

const userAuth = async (req, res, next) =>{
    try{
        const {token} = req.cookies
        if(!token){
            throw new Error("Invalid credentails");
        }

        const decodedData = await jwt.verify(token, "SECRETKEY")
        const {_id} = decodedData

        const user = await User.findById(_id)
        if(!user){
            res.send("User doesn't exists")
        }
        req.user = user
        next()
    }catch(err){
        res.status(400).send("ERROR :" + err.message)

    }
}

module.exports = {userAuth}