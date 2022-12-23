const User = require("../models/userModels");


//add register

exports.addUser = this.addUser = async (req,res,next)=>{
    try{
        const user = await User.create(req.body);
        return res.status(200).json({
            success:true,
            user:user,
        });
    }
    catch(e){
        console.log(e);
    }
};