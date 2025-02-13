const mongoose = require('mongoose');
const Chat=require("./models/chat.js");
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
 }
 main().then(()=>{
     console.log("connectn success");
 })
 .catch((err)=>console.log(err));



 let allchats=[
    {
        from:"sunny",
        to:"shivam",
        msg:"hi how r u?",
        created_at:new Date()
    },
    {
        from:"ravi",
        to:"kishan",
        msg:"hi how r u?",
        created_at:new Date()
    },
    {
        from:"rajan",
        to:"ritu",
        msg:"hi how r u?",
        created_at:new Date()
    }

 ]
 Chat.insertMany(allchats);
 