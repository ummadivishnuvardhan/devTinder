const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json()); // Required to parse JSON body from requests

//finding a single user from the dataBase by emailId
app.get("/feedbyemailid",async (req,res)=>{
    const emailId=req.body.emailId;
    // Assuming you want to fetch a user by emailId
    console.log("Email ID received:", emailId);
    try{
        const user=await User.findOne({email:emailId});
        if(!user){
            return res.status(404).send("Something went wrong,No user found");
        }
        console.log("User data fetched successfully:", user);
        res.json(user);
    }catch(error){
        console.error("Error fetching user data:", error);
        res.status(500).send("Error fetching user data");
    }
});

//finding all users from the dataBase
app.get("/feed",async (req,res)=>{
    // Assuming you want to fetch all users from the database
    try{
        const users=await User.find({});
        if(users.length === 0){
            return res.status(404).send("Something went wrong,No users found");
        }
        else{
            console.log("User data fetched successfully:", users);
            // You can send the user data as a response
            res.json(users);
        }
    }catch(error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Error fetching user data");
    }
  
})

//Deleting a user from the dataBase
app.delete("/deleteUser",async (req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).send("Something went wrong,No user found");
        }
        console.log("User deleted successfully:", user);
        res.json(user);
    }catch(error){
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user");
    }
})

//Adding a new User to the dataBase
app.post("/signup", async (req, res) => {
    // console.log(req.body);
    // Assuming req.body contains user data, you can create a new user instance
    try {
        const user = new User(req.body);

        await user.save();
        res.send("User created Successfully");
    } catch (error) {
        res.status(500).send("Error creating user: " + error.message);
    }
});

//Updating a user in the dataBase
app.patch("/updateUser", async (req, res) => {
    const userId=req.body.userId;
    const updateData = req.body; // Assuming updateData contains the fields to be updated
    
    try{
        const user = await User.findByIdAndUpdate(userId, updateData,{new: true});
        validators:true;
        if(!user){
            return res.status(404).send("Something went wrong,No user found");
        }
        console.log("User updated successfully:", user);
        res.json(user);
    }catch(error){
        console.error("Error updating user:", error);
        res.status(500).send("Error updating user: " + error.message);
    }
});



connectDB()
    .then(() => {
        console.log("Database connection established successfully");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
