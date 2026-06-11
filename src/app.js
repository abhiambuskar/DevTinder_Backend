const express = require("express")

const app = express()

const {userAuth, adminAuth} = require("./middleware/auth")


app.use("/user", userAuth)

app.get("/testing", (req, res) =>{
    console.log(req.params)
    res.send("Testing ? () *")
})

app.get("/user/:userid/:name/:age",(req, res) =>{
    console.log(req.params)
    res.send({firstname: "Abhi", lastname: "Ambuskar"})
})



app.post("/user",(req, res) =>{
    res.send("Data saved to DB successfully")
})

app.delete("/user",(req, res) =>{
    res.send("Data deleted from DB")
})


app.use("/test", (req, res) =>{
    res.send("Hello Testing")
})

app.use("/hello", (req, res) =>{
    res.send("Hello hELLO")
})

app.use("/next", 
    (req, res, next) =>{
        console.log("1st handler");
        //res.send("1st handler");
        next()
    },
    (req, res, next) =>{
        console.log("2nd handler");
        //res.send("2nd handler");
        next()
    },
    (req, res, next) =>{
        console.log("3rd handler");
        //res.send("3rd handler");
        next()
    },
    (req, res, next) =>{
        console.log("4th handler");
        res.send("4th handler");
        next()
    }
)

app.use("/getUserdata", (req,res, next) =>{
    try{
        throw new Error("Not able to get user data")
        res.send("Hello ")
    }catch(err){
        res.status(500).send("Not able to get data contact support team")
    }
})

app.use("/", (err, req, res,next) =>{
    if(err){
        res.send("Not able to get data please contact Support Team")
    }
})


app.listen(3000, ()=>{
    console.log("Hello Listening to server")
})