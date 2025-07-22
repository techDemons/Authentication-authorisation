const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();


               //SIGNUP
exports.signUp = async (req, res)=>{
    try{
        const {name, email, password, role} = req.body;
        const existingUser = await User.findOne({email});
             if(existingUser){
                 return res.status(400).json({
                     success:false,
                     message:"User already exists",
         })
        };
        let hashedPassword;
        try{
            //hash fxn is used to generate the salt and then hashes the password
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(400).json({
                 success:false,
                 message:"Failure while hashing password"
        })
        
    }
    //create fxn is used to insert or add new data in db
    const user = await User.create({
        name, email, password:hashedPassword, role
    })

    return res.status(200).json({
        success:true,
        message:"User created successfuly",
    });

}catch(error){
    console.error(error);
    return res.status(500).json({
        success:false,
        message:"User is not registered, please register first"
    });
}}



               //LOGIN 
exports.login = async (req,res)=>{
    try{
        const {email, password} = req.body;

        //email/password doesnt exits in database
        if(!email || !password){
           return res.status(400).json({
                success:false,
                message:"Please provide email or password"
            });
        }


        //finding email in db 
        const user = await User.findOne({email});
        if(!user){
          return res.status(401).json({
            success:false,
            message:"User not registered, create account"
          });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
         };
        //verifying and hasing the password
        //bcrypt.compare fxn compares the plain text pass with hash pass, if they matched then returned true;
        //user.pwd is hashed pwd
        if(await bcrypt.compare(password, user.password)){
            //when pass gets matched, creates jwt tokens
            let token = jwt.sign(payload,
                                        process.env.JWT_SECRET,
                                    {
                                        expiresIn:"2h",
                                     });

             user.token;
            user.password=undefined;//to remove the pwd from res data in client side instead of pwd is hashed
            // user.name = undefined;
            console.log(user);
            const options = {
                        expires: new Date(Date.now() + 3*24*60*60*1000),
                        //by making cookies as httpOnly flag, it ensures that cookies are only accessible by server not by client side .
                        httpOnly:true,
            };
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully",
            });
        }else{
            return res.status(403).json({
                success:false,
                message:"PassWord is Incorrect"
            });
        }
    }catch(error){
        console.log(error);
        error.message
       return res.status(500).json({
        success:false,
        message:"Login failed!!!",
        error: error.message
        })
        
    }
}