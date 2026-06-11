const mongoose = require("mongoose")

const connectDB = async () =>{
    await mongoose.connect("mongodb://namastedevMongoDB:xdLiC6voxEulxM4W@ac-hciydq0-shard-00-00.lccqnlv.mongodb.net:27017,ac-hciydq0-shard-00-01.lccqnlv.mongodb.net:27017,ac-hciydq0-shard-00-02.lccqnlv.mongodb.net:27017/?ssl=true&replicaSet=atlas-uxbfv4-shard-0&authSource=admin&appName=DevTinder")
}

module.exports = connectDB

