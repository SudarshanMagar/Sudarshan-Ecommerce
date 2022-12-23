const mongoose = require("mongoose");
const validator = require("validator")
const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Enter the name"],
        minLength: 2,
    },
    email:{
        type: String,
        required: [true,"Please Enter the email"],
        validator: [validator.email,"Please enter the validate email"],
    },    
    profile_pic:{
        public_id:{
            type: String,
            default: "default.png",
        },
        url:{
            type: String,
            default: "default.png"
        }
    },
    address:{
        type:String,
        required:[true,"Please select a address"],
    },

    roles:{
        type: String,
        default: "user"
    },
});

module.exports = mongoose.model("User",userschema);