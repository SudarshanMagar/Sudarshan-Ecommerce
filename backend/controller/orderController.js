const Order = require("../models/orderModels");
const Product = require("../models/productModels");

exports.createOrder = async (req, res, next) => {
  const {
    shipping,
    orderItems,
    taxCost,
    payment,
    itemsPrice,
    deliveryCharge,
    totalPrice,
  } = req.body;

  await Order.create({
    shipping,
    orderItems,
    taxCost,
    payment,
    itemsPrice,
    deliveryCharge,
    totalPrice,
    user: req.user._id,
  }).then((result)=>{
    return res.status(200).json({
        status:true,
        order:result,
    });
  })
  .catch((err)=>{
    res.json({
        status:false,
        message:err.message,
    });
  });
};

exports.getAllOrders = async (req,res,next)=>{
   try{
    const orders =  await Order.find();
    return res.status(200).json({
        status: true,
        orders,
    });
   }catch(error){
    return res.json({
        status:false,
        message: error.message,
    });
   }
};

exports.getMyOrders = async (req,res,next)=>{
   try{
    const orders =  await Order.find({user: req.user._id});
    return res.status(200).json({
        status: true,
        orders,
    });
   }catch(error){
    return res.json({
        status:false,
        message: error.message,
    });
   }
};

exports.getOrder = async (req,res,next)=>{
   try{
    const orders =  await Order.findById(req.params.id);
    return res.status(200).json({
        status: true,
        orders,
    });
   }catch(error){
    return res.json({
        status:false,
        message: error.message,
    });
   }
};


exports.updateStatus = async(req,res,next)=>{
   try{
    const {orderId, status} = req.body;
    const order = await Order.findById(orderId);
    if(order.status== "Delivered"){
        return res.json({
            success:false,
            message: "Product Already Delivered"
        });
    }

    if (status == "Delivered"){
        order.orderItems.forEach(async(item)=>{
           await updateStock(item.product, item.quantity);
        });
    }
    order.status = status
    await order.save({validateBeforeSave:false});

    return res.status(200).json({
        success:true,
        order,
    });
   }catch(error){
    return res.json({
        success:false,
        message: error.message,
   });
}
};

async function updateStock(id, quantity)
{
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({validateBeforeSave:false});
};

exports.deleteOrders = async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return res.json({
            status:false,
            message:"The order doesnt exit",
        });
    }
    await order.delete();
    return res.json({
        status:true,
        message:"the order is deleted",
    });

};


