const express = require("express")

const app = express()



app.use("/test", (req, res) =>{
    res.send("Hello Testing")
})

app.use("/hello", (req, res) =>{
    res.send("Hello hELLO")
})

app.listen(3000, ()=>{
    console.log("Hello Listening to server")
})