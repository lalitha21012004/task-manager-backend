const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    userId:{type:String,required:false},
    title:{type:String,required:true},
    category:{type:String,enum:['Work','Personal','Urgent'],default:'Personal'},
    completed:{type:Boolean,default:false},
createdAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model('Task',taskSchema);