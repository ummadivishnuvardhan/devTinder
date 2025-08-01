const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next)=>{
    try{
        const cookies = req.cookies;
        const token = cookies.token;
        if(!token){
            throw new Error("Invalid Token");
        }
        const decodedMessage = await jsonwebtoken.verify(token,"DEV@Tinder$790");
        const {_id} = decodedMessage;

        // Find the user by ID
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }

        // Attach user to request object
        req.user = user;
        next();
    }catch(error){
        res.status(400).send({"Error":error.message});
    }
}
 
module.exports={
   userAuth,
}