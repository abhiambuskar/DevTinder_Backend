const express = require("express")
const connectDB = require("./config/database")
const app = express()
const User = require("./models/user")
const {userAuth, adminAuth} = require("./middleware/auth")
const {validateData} = require("./utils/validations")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt =  require("jsonwebtoken")


// app.use("/user", userAuth)

// app.get("/testing", (req, res) =>{
//     console.log(req.params)
//     res.send("Testing ? () *")
// })

// app.get("/user/:userid/:name/:age",(req, res) =>{
//     console.log(req.params)
//     res.send({firstname: "Abhi", lastname: "Ambuskar"})
// })



// app.post("/user",(req, res) =>{
//     res.send("Data saved to DB successfully")
// })

// app.delete("/user",(req, res) =>{
//     res.send("Data deleted from DB")
// })


// app.use("/test", (req, res) =>{
//     res.send("Hello Testing")
// })

// app.use("/hello", (req, res) =>{
//     res.send("Hello hELLO")
// })

// app.use("/next", 
//     (req, res, next) =>{
//         console.log("1st handler");
//         //res.send("1st handler");
//         next()
//     },
//     (req, res, next) =>{
//         console.log("2nd handler");
//         //res.send("2nd handler");
//         next()
//     },
//     (req, res, next) =>{
//         console.log("3rd handler");
//         //res.send("3rd handler");
//         next()
//     },
//     (req, res, next) =>{
//         console.log("4th handler");
//         res.send("4th handler");
//         next()
//     }
// )

// app.use("/getUserdata", (req,res, next) =>{
//     try{
//         throw new Error("Not able to get user data")
//         res.send("Hello ")
//     }catch(err){
//         res.status(500).send("Not able to get data contact support team")
//     }
// })

// app.use("/", (err, req, res,next) =>{
//     if(err){
//         res.send("Not able to get data please contact Support Team")
//     }
// })

app.use(express.json())
app.use(cookieParser())

const authRouter = require("../src/routes/auth")
const profileRouter = require("../src/routes/profile")
const requestRouter = require("../src/routes/request")
const userRouter = require("../src/routes/user")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)
// //GET Profile 
// app.use("/profile", async (req, res) =>{
//     try{
//         const user = await req.user
    
//         res.send(user)
        
        
//     }catch(err){
//         console.log("Unable to login!!!")
//         res.status(400).send("Error: " + err.message)
//     }
// })




// //GET API to get a particular user
// app.get("/users", async (req, res) =>{
//     try{
//         const useremail = req.body.email
//         const user =await User.find({"email": useremail})
//         if(user.lenght > 0){
//             res.send(user)
//         }else{
//             res.send("Unable to find user data")
//         }
//     }catch{
//         console.log("Unable to add user data !!!")
//         res.status(400).send("Unable to find user data")
//     }
// })

// // GET API to get the feed
// app.get("/feed", async (req, res) =>{
//     try{
        
//         const user =await User.find({})
//         if(user){
//             res.send(user)
//         }else{
//             res.send("Unable to find user data")
//         }
//     }catch{
//         console.log("Unable to add user data !!!")
//         res.status(400).send("Unable to find user data")
//     }
// })

// //DELETE API to delete a user
// app.delete("/users", async (req, res)=>{
//     const userid = req.body.userid;
//     try{

//         const user = await User.findByIdAndDelete(userid)
//         res.send("User deleted successfully")
//     }catch{
//         res.status(404).send("Something went wrong")
//     }
// })

// //UPDATE API using
// app.patch("/users/:userid", async (req, res)=>{
//     const userid = req.params?.userid;
//     runValidators = true
//     const data = req.body
//     try{
        
//         const ALLOWED_UPDATES = ["about", "age", "password"]

//         const isUpdateAllowed = Object.keys(data).every((k) =>
//             ALLOWED_UPDATES.includes(k)
//         )

//         if(!isUpdateAllowed){
//             throw new Error("Update not allowed");
//         }
//         const user = await User.findByIdAndUpdate(userid, data)
//         console.log(user)
//         res.send("User upaded successfully")
//     }catch(err){
//         res.status(404).send("Something went wrong " + err.message)
//     }
// })

connectDB()
    .then(()=>{
        console.log("Connected to DB successfully")
        app.listen(3000, ()=>{
            console.log("Hello Listening to server")
        })
    })
    .catch((err)=>{

        console.error("Unable to connect to DB")
    })


