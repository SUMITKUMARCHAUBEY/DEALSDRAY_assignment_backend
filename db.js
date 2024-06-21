const mongoose=require('mongoose');

const connectToDb=()=>{
    mongoose.connect("mongodb+srv://schaubey:TbEdf4uxpGX4bXvQ@cluster0.q66f2fm.mongodb.net/")
    .then(()=>{
        console.log('connected to db');
    })
    .catch((e)=>{
        console.log(e);
    })
}
module.exports=connectToDb;