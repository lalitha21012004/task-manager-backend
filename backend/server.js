const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require('mongoose');
app.use(cors());
app.use(express.json());

const Task=require('./models/Task');

mongoose.connect('mongodb://Lalitha:Lalitha21@cluster0-shard-00-00.25sty.mongodb.net:27017,cluster0-shard-00-01.25sty.mongodb.net:27017,cluster0-shard-00-02.25sty.mongodb.net:27017/taskdb?ssl=true&replicaSet=atlas-ef10wy-shard-0&authSource=admin&retryWrites=true&w=majority')
.then( ()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));


app.listen(3000,()=> console.log("Server running at http://localhost:3000"));

//Get all tasks
app.get('/tasks',async(req,res)=>{
    const task=new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

//add task
app.post('/tasks',async(req,res)=>{
    const task=new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

//update task
app.put('/tasks/:id',async(req,res)=>{
    const {id}=req.params;
    const task=await Task.findByIdAndUpdate(id,req.body,{new:true});
    if(!task){
        return res.status(404).json({message:"Task not found"});
    }           

    res.json(task);
});

//delete task
app.delete('/tasks/:id',async(req,res)=>{
    const {id}=req.params;
    const task=await Task.findByIdAndDelete(id);
    if(!task){
        return res.status(404).json({message:"Task not found"});
    }               
    res.json({message:"Task deleted"});
});
