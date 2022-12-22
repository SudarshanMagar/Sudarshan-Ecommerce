const mongoose = require("mongoose");




const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Enter the product name"],
        minlength:2,
    },
    price:{
        type: Number,
        required: [true,"Please Enter the product's price"],
    },
    description:{
        type: String,
        required: [true,"Please Enter the product description"],
    },
    images:[
        {
            public_id:{
                type: String,
                required:[true,"Please Enter the public id"],
            },
            URL: {
                type: String,
                required:[true,"Please Enter the url"],
            },
        },
    ],
    noOfReviews:{
        type: Number,
        default:0
    },
    
    reviews:[
        {
            name:{
                type: String,
                required:[true,"Please Enter the name"],
            },
            Comment:{
                type: String,
            },
            rating:{
                type: Number,
                required: [true,"Please Enter the rating"],
            },
        },
    ],
    category:{
        type:String,
        required:[true,"Please select a category"],
        enum:[
            "Electronics",
            "clothes",
            "Food",
            "Smart phones",
            "Laptop",
            "home appliances",
            "beauty",
        ],
    },
});

module.exports = mongoose.model("Product",productSchema);