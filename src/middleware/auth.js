const checkadmin=(req,res,next)=>{
const auth="xyz";
if(auth==="xyz"){
    next();
}
else{
    res.status(401).send("Unauthorized access");
}
}
const checkuser=(req,res,next)=>{
const auth="xyz";

if(auth==="xyz"){
    next();
}
else{
    res.status(401).send("Unauthorized access");
}
}
module.exports={
    checkadmin,
    checkuser
}