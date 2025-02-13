const express = require('express');
const mongoose = require('mongoose');
const path=require("path");
const app = express();
const port = 3000;
const Chat=require("./models/chat.js");
const methodOverride = require('method-override')

//to parse data coming from new.ejs 
app.use(express.urlencoded({extended:true}));


//to override with post having?_method=put where: real req=put
app.use(methodOverride('_method'));

//creating obj of model chat
// let chat1=new Chat({
//     from:"sunny",
//     to:"shivam",
//     msg:"hi how r u?",
//     created_at:new Date()
// })

// //saving obj
// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

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
//1.index route
app.get("/chats",async(req,res)=>{
    let chats= await Chat.find();
    res.render("index.ejs",{chats});
})

//2.new chat form 
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");

})
 //3.post request to insert data into db and reflect output in index page
app.post("/chats",(req,res)=>{

    let{from,to,msg}=req.body;
let newchat=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
});
newchat.save().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})

res.redirect("/chats");

})

//4.edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//5. update route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let{msg:newmsg}=req.body;
    let updatedchat=await Chat.findByIdAndUpdate(id,{
    msg:newmsg
    },{
        runValidators:true,new:true
    })

    res.redirect("/chats");
})

//6 delete route
app.delete("/chats/:id", async (req,res)=>{
    let {id}=req.params;
    let chattobedeleted=await Chat.findByIdAndDelete(id);
    console.log(chattobedeleted);
    res.redirect("/chats");
})


//express
app.listen(port, () => {
  console.log(`whatsapp app listening on port ${port}`)
})

//for css
app.use(express.static(path.join(__dirname,"public")));