const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const taskSchema = new mongoose.Schema({
    userId: {type: ObjectId, ref: "User",required: true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    dueDate: {type:String,required:true},
    status: {type:Boolean,required:true}
})

module.exports = mongoose.model("Task",taskSchema)