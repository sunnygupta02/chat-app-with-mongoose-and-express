const express = require('express');
const mongoose = require('mongoose');
const path=require("path");
const app = express();
const port = 3000;

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
app.get('/', (req, res) => {
  res.send("working")
})


//express
app.listen(port, () => {
  console.log(`whatsapp app listening on port ${port}`)
})