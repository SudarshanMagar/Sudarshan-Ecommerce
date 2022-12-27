const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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
        unique: true,
    },  
    password:{
        type:String,
        required:[true,"Please enter the password"],
        minLength:[8,"Password must be greater than 8 character"],

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


//encripted password
userschema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

//password compare

userschema.methods.comparePassword = async function(enterPasswrd){
    console.log(this.password);
    console.log(enterPasswrd);

    return await bcrypt.compare(enterPasswrd,this.password); 
};

//user token

userschema.methods.getToken = async function(){
    const token = jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:"1d",
    });
    return token;
};


module.exports = mongoose.model("User",userschema);