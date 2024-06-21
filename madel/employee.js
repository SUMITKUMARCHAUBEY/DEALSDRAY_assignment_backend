const mongoose= require('mongoose')

const Employee=new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    course:{
        type:Array,
        required:true,
    },
    img:{
        type:String,
        
    },
    date:{
        type:Date,
        default: () => {
            let now = new Date();
            return now;
        },
    }

})
module.exports=mongoose.model('Employee',Employee)