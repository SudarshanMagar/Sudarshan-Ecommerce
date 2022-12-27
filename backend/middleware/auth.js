const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "please login to continue",
      });
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeData.id);
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.authorizedRole=(...roles)=>{
    
    return (req,res,next)=>{
        if(!roles.includes(req.user.roles)){
            return res.status(403).json({
                success:false,
                message:"Access Deined",
            });
        }else{
            next();
        }
    };
};
