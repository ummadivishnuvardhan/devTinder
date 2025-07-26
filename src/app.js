const express=require("express");
const app=express();
app.get("/user",(req,res)=>{
    res.send("Hello I am from user");
});
app.post("/user",(req,res)=>{
    res.send("Data succesfully saved into the dataBase from user");
});
app.delete("/user",(req,res)=>{
    res.send("Data succesfully deleted from the dataBase from user");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});