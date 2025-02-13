const express = require('express');
const mongoose = require('mongoose');
const path=require("path");
const app = express();
const port = 3000;
const Chat=require("./models/chat.js");



//creating obj of model chat
let chat1=new Chat({
    from:"sunny",
    to:"shivam",
    msg:"hi how r u?",
    created_at:new Date()
})

//saving obj
chat1.save().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})

//ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

//mongoose setup
async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main().then(()=>{
    console.log("connectn success");
})
.catch((err)=>console.log(err));


//ejs
app.get("/chats",async(req,res)=>{
    let chats= await Chat.find();
    res.render("index.ejs",{chats});
})


//express
app.listen(port, () => {
  console.log(`whatsapp app listening on port ${port}`)
})

//for css
app.use(express.static(path.join(__dirname,"public")));