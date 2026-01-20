const express = require('express');
const mongoose = require('mongoose');
const ToDo = require('./model1');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://kirankumarpoola1_db_user:kiran400@cluster0.o5ltzwd.mongodb.net/').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

app.post('/p.kiran', async (req, res) => {
    const {title} = req.body;
    const {description} = req.body;
    const {priority} = req.body;
    const {duedate} = req.body;
    try {
        const newData = new ToDo({title, description, priority, duedate});
        await newData.save();
        return res.json("User data added successfully");
    } catch (err) {
        console.log(err.message);
    }});
app.put('/updatestatus', async(req,res) => {
   const {completed}=req.body;
    try{        
        return res.json("Task status successfully updated");
    }
    catch(err){
        console.log(err.message);
    }
});

app.put('/update/:id', async(req,res) => {
    const {title}=req.body;
    const {description}=req.body;
    try{
        await ToDo.findByIdAndUpdate(req.params.id,{title,description});
        return res.json(await ToDo.find());
    }
    catch(err){
        console.log(err.message);
    }
});
    
app.get('/get_all_data', async (req, res) => {
    try {
        const allData = await ToDo.find();
        return res.json(allData);
    } catch (err) {
        console.log(err.message);
    }});

    app.delete('/delete/:id',async (req,res)=>{
        try{
            await ToDo.findByIdAndDelete(req.params.id);
            return res.json(await ToDo.find());

        }
        catch(err){
            console.log(err.message);
        }
    });
app.listen(3000, () => console.log('Server is running on http://localhost:3000') );