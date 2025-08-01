const mongoose=require('mongoose');
const validator=require("validator");
const bcrypt=require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50, 
        validate(value) {
             if (!/^[A-Za-z]+(?: [A-Za-z]+)?$/.test(value)) {
                 throw new Error("First name must contain only letters and at most one space");
            }
    }
    },
    lastName:{
        type:String,
        trim:true,
        minlength:3,
        maxlength:50,
        validate(value){
            if(!/^[a-zA-Z]+$/.test(value)){
                throw new Error("Last name must contain only letters");
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter a valid email address");
            }
        },
        validate: {
        validator: async function (value) {
        const user = await mongoose.models.User.findOne({ email: value });
        // Only throw error if a different user already has this email
        return !user || user._id.equals(this._id); // Allow update on the same user
        },
        message: 'Email already registered'
    }
},
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            }
        },
    },
    gender:{
        type:String,
        enum:['male','female','other','Female','Male','Other']
    },
    photo:{
        type:String,
        default:"https://www.freepik.com/free-vector/illustration-businessman_2606517.htm#fromView=keyword&page=1&position=26&uuid=90040bad-21f6-452e-a5cd-c9ccdd2f1d29&query=Profile+Avatar", // Default profile picture URL,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter a valid URL");
            }
        },
    },
    about:{
        type:String,
        default:"Hey there! I'm using DevTinder to connect with like-minded individuals and explore new opportunities. Let's chat and see where it goes!" // Default
    },
    skills:{
        type:[String], // Array of strings for skills
        validate: {
            validator: function(v) {
                return v.length <= 10; // Limit to 10 skills
            },
            message: 'You can only have up to 10 skills.'
        }
    }, // Array of skills
},{
    timestamps:true // Automatically manage createdAt and updatedAt fields in the database
});

userSchema.methods.getJWT =async function() {
    const user= this;
     const token =await jsonwebtoken.sign({_id: user._id},"DEV@Tinder$790",{
                    expiresIn:"7d" // Token will expire in 7 days
    
               });

               return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash=user.password;
    const isPasswordValid= await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const User=mongoose.model('User',userSchema);
module.exports=User;