const express = require("express")

const app = express()

app.get("/tes?ting", (req, res) =>{
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

app.listen(3000, ()=>{
    console.log("Hello Listening to server")
})