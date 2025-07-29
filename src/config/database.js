const mongoose=require('mongoose');
const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://ummadivishnuvardhan46:WPubNckmNypn1zby@namastenode.hspu4kq.mongodb.net/devTinder");
};

module.exports=connectDB;