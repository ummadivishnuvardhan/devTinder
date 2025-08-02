const express= require("express");

const profileRouter = express.Router();

const {userAuth} = require("../middleware/auth");


profileRouter.get("/profile",userAuth,async(req,res)=>{
    // Assuming you want to return the profile of the logged-in user
    try{
        const user=req.user;
        if(!user){
            throw new Error("User not found");
        }
      
        res.send(user);
    }catch(error){
        console.error("Error reading cookies:", error);
        res.status(500).send("Error reading cookies");
    }
})

module.exports = profileRouter;