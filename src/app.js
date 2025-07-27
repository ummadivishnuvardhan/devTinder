const express=require("express");
const app=express();
app.get("/user",(req,res,next)=>{
     console.log("I'm fromm the first Route");
  
    // res.send("I think I might come before second Response");
    next();
},
(req,res,next)=>{
    console.log("I'm fromm the second Route");
    // res.send("hey I am the Response");
    next();
},
(req,res,next)=>{
    console.log("I'm fromm the third Route");
    res.send("hey I am the Response");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});