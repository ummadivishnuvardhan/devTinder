const express=require("express");
const app=express();
app.use("/test",(req,res)=>{
    res.send("Hello I am from test");
});
app.use("/hello",(req,res)=>{
    res.send("Hello I am from hello");
});
app.use("/home",(req,res)=>{
    res.send("Hello I am from home");
});
app.use("/profile",(req,res)=>{
    res.send("Hello I am from profile page");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});