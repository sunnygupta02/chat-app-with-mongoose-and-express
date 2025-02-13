const mongoose = require('mongoose');

//defining schema
const chatSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        
    },
    created_at:{
        type:Date,
        required:true
    },


})

//creating model/collection

const Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;
