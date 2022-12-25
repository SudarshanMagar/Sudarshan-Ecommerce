const User = require("../models/userModels");


//add register

exports.registerUser = async (req,res,next)=>
{
        const {name,email,password,address} = req.body;
        const user = await User.create({
            name,
            email,
            password,
            address,
            profile_pic:{
                public_id: "default",
                url:"default",
            },
        });
        return res.status(200).json({
            message: "user Registered",
            user,
        });
};