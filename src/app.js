
const express=require("express");
const app=express();
const {checkadmin,checkuser}=require("./middleware/auth");
app.use("/admin",checkadmin)
app.get("/admin/getData",(req,res,next)=>{
     
  
    res.send("Data succesfully retrieved");
});
app.get("/admin/delete",(req,res,next)=>{
    
  
    res.send("deleted succesfully");
});
app.use("/user",checkuser);
app.get("/user/getdata",
(req,res,next)=>{
    

 res.send("hey I am the Response");
    
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});