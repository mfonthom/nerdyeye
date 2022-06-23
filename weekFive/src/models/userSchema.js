const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
        trim : true,
        
    },
    refreshToken : {
        type : String
    },
},
{timestamps : true}

);

module.exports = mongoose.model("User", userSchema)