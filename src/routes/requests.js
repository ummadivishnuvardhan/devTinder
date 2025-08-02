const express= require("express");

const requestRouter = express.Router();

const {userAuth} = require("../middleware/auth");

requestRouter.get("/sendConnectionRequest",userAuth, async (req,res)=>{
//const userId = req.userId; // Assuming the user ID is passed as a query parameter
    const user = req.user; // The authenticated user

    res.send("Connection request sent to user with ID: " + user.firstName);
});

module.exports = requestRouter;