const dotenv = require("dotenv");
dotenv.config()
const mongoose = require("mongoose")
const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the database");
}

module.exports = connectDB;