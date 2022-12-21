const Product = require("../models/productModels");

//add a product

exports.addProduct = addProduct = async (req,res,next)=>{
    try{
        const product = await Product.create(req.body);
        return res.status(200).json({
            success:true,
            product:product,
        });
    }
    catch(e){
        console.log(e);
    }
};

exports.getAllProduct = async (req,res)=>{
    return res.status(200).json({
        message: "Success",
    });
};

