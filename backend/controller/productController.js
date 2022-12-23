const Product = require("../models/productModels");
const SearchSort = require("../utils/SearchSort");

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

exports.getAllProduct = async (req,res,next)=>{
   try{
    // console.log(req.query);
    const searchSort = new SearchSort(Product.find(), req.query);
    const count = await Product.count();
    const products = await searchSort.search().sort().pagination(5).query;
    return res.status(200).json({
        message: "Success",
        products,
        count,
    });
   }
   catch(e){
    console.log(e);
   }

};

exports.updateProduct =  async (req,res)=>{
  try{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product){
        res.status(404).json({
            success:false,
        });
    }
    let updateProduct = await Product.findByIdAndUpdate(productId,req.body,{
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success:true,
        product: updateProduct,
        message:"The product is updated",
    });
  }
  catch(e){
    console.log(e);
  }
};

exports.removeProduct =  async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
    if (!product){
        res.status(404).json({
            success:false,
        });
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"The product is removed",
    });
    }
    catch(e){
        console.log(e);
    }
};