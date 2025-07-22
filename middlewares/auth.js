const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next)=>{
    try{
        //extract tokens from req body.
        const token = req.body.token;
        if(!token){
            res.status(401).json({
                success:false,
                message:"Token is not in body",
            });
        }
        
        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

        }catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is not verified",
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Something is wrong in verifing the token",
        })
    }
}


exports.isStudent = (req, res, next)=>{
    try{
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This route is for student",
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not defined",
        })

    }
}

exports.isAdmin = (req, res, next)=>{
    try{
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This route is for admin",
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not defined",
        })

    }
}