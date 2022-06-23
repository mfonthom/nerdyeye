const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    price : {
        type : Number,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{timestamps : true}

);
 
module.exports = mongoose.model("Product", productSchema);