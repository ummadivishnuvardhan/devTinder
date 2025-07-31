const validator=require("validator");

const validateSignUpData=(req)=>{
    const { firstName, lastName, age,email,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("firstName and lastName are required");
    }
    if(!validator.isEmail(email)){
        throw new Error("Invalid email format");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Weak password");
    }
};
module.exports={
    validateSignUpData
}