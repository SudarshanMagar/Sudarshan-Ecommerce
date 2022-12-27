const Product = require("../models/productModels");
const SearchSort = require("../utils/SearchSort");

//add a product

exports.addProduct = addProduct = async (req,res,next)=>{
    try{
        req.body.user = req.user.id;
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

// write a function to add product review

exports.addProductReview = async (req,res) =>{
    const {rating, comment,proId } = req.body;
    const name = req.user.name;
    const id = req.user._id;


    const review ={
        name,
        user: id,
        rating,
        comment,
    };
    const product = await Product.findById(proId)
    const isReviewed = await product.reviews.find(
        (review)=> review.user.toString() == req.user._id.toString()
    );
    if (!isReviewed){
        product.reviews.push(review);
        product.noOfReviews +=1;
    }
    else{
        product.reviews.forEach((review)=>{
        if(review.user.toString() == req.user._id.toString()){
            review.comment=comment;
            review.rating=rating;
        }
     })
    }

    //calculate rating
    let totalRating = 0;
    product.reviews.forEach((review)=>{
        totalRating += review.rating;
    });
    product.rating = totalRating / product.reviews.length;
    await product.save();

    return res.status(200).json({
        success: true,
        product,
    });
};

//add reviews
exports.getAllReviews = async (req,res,next)=>{
    try{
        const product =await Product.findById(req.params.id);
    return res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
    }catch{
        return res.json({
            success:false,
            message: error.message,
        });
    }
};

//delete reviews
exports.deleteReviews = async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id);
        const reviews =  await product.reviews.filter(
            (rev)=>rev.user.toString()!= req.user._id.toString()
            );
            if (reviews.length == product.reviews.length){
                return res.status(200).json({
                    success:false,
                    message:"Reviews Already Deleted",
                });
            }
        product.reviews = reviews;
        product.noOfReviews -=1;

        let totalRating = 0;
        product.reviews.forEach((review)=>{
            totalRating += review.rating;
        })
        const leng = product.reviews.length == 0 ?? 1;
        product.rating = totalRating / leng;
        await product.save();

        return res.status(200).json({
            success:true,
            product,
        });
    }
    catch(error){
     return res.json({
        success:false,
        message: error.message,
     });   
    }
};
