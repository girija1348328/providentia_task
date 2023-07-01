const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const multer = require("multer")

const route = require("./routes/route")
const app = express()

app.use(bodyParser.json());
app.use(multer().any())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://disha123:hl6LMcJIED1eCZhr@cluster0.hrerz.mongodb.net/providentia")
.then(()=>console.log("mongodb is connected"))
.catch(err=>console.log(err))

app.use('/',route)

app.listen(process.env.PORT || 3001,function(){
    console.log("express app running on port 3001")
})



