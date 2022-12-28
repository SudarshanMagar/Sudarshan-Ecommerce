const mongoose = require("mongoose");


const orderSchem = new mongoose.Schema({
    shipping:{
        area:{
            type: String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        district:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        contactNo:{
            type:String,
            required:true,
            maxlength:[14,"Please enter a valid number"],
            minlength:[10,"Please enter a valid number"],
        },
        postalCode:{
            type:String,
            default:"44600",
            required:true,
        },
    },

    orderItems:[
        {
            product:{
                type: mongoose.Schema.ObjectId,
                ref:"Product",
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
        },
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
    },

    payment:{
        id:{
            type:String,
            required:true,
        },
        status:{
            type:String,
        },
    },

    paiedAt:{
        type:Date,
    },

    itemsPrice:{
        type:Number,
        required:true,
    },
    deliveryCharge:{
        type:Number,
        required:true,
        default:0,
    },
    taxCost:{
        type:Number,
        required:true,
        default:0,
    },
    totalPrice:{
        type:Number,
        required:true,
    },

    status:{
        type:String,
        default:"Processing",
    },
});
module.exports = mongoose.model("Order",orderSchem);