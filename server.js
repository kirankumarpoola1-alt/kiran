const express = require('express');
const mongoose = require('mongoose');
const EmpData = require('./model');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://kirankumarpoola1_db_user:kiran400@cluster0.o5ltzwd.mongodb.net/').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

app.post('/signup', async (req, res) => {
    const {username} = req.body;
    const {email} = req.body;
    const {password} = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newData = new EmpData({username, email, password: hashedPassword});
        await newData.save();
        return res.json("User signup successfully");
    } catch (err) {
        console.log(err.message);
    }});
app.put('/login', async(req,res) => {
   try{
    const {username}=req.body;
    const {password}=req.body;
    const founduser = await EmpData.findOne({ username });
    const isPasswordValid = await bcrypt.compare(password, founduser.password);
    if (!isPasswordValid) {
        return res.json("Invalid password");
    }
    return res.json("User login successfully");
   }
   catch(err){
       console.log(err.message);
   }
});
app.put('/update/:id', async(req,res) => {
    const {username}=req.body;
    const {email}=req.body;
    try{
        await EmpData.findByIdAndUpdate(req.params.id,{username,email});
        return res.json(await EmpData.find());
    }
    catch(err){
        console.log(err.message);
    }
});
    
app.get('/get_all_data', async (req, res) => {
    try {
        const allData = await EmpData.find();
        return res.json(allData);
    } catch (err) {
        console.log(err.message);
    }});

    app.delete('/delete/:id',async (req,res)=>{
        try{
            await EmpData.findByIdAndDelete(req.params.id);
            return res.json(await EmpData.find());

        }
        catch(err){
            console.log(err.message);
        }
    });
app.listen(3000, () => console.log('Server is running on http://localhost:3000') );