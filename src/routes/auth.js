const express=require("express");

const authRouter=express.Router();

const User = require("../models/user");
const bcrypt=require("bcrypt");
const {validateSignUpData,validateLoginData} = require("../utils/validator");

//Adding a new User to the dataBase
authRouter.post("/signup", async (req, res) => {
    
    // Assuming req.body contains user data, you can create a new user instance
    try {
        //validating the signUp data
        validateSignUpData(req); 

        const {firstName,lastName,age,email,password} = req.body;

        // Hashing the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            firstName,
            lastName,
            age,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.send("User created Successfully");
    } catch (error) {
        res.status(500).send("Error " + error.message);
    }
});


authRouter.post("/login",async (req,res)=>{
    try{
       const {email,password}=req.body;
       validateLoginData(req);
        
        const user=await User.findOne({email:email});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const  isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
           //create a JWT Token

           //Add the token to the user's cookies
           const token =await user.getJWT();
            res.cookie("token",token,{
                expires: new Date(Date.now() + 3600000), // 1 hour
            });
            res.send("Login Successfull");
        }
        else{

            throw new Error("Invalid credentials");
          
        }
    }catch(error){
        res.status(400).send("Error:"+error.message);
    }
})

module.exports = authRouter;