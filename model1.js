const mongoose = require('mongoose');
const {type}=require("os");
const { title } = require('process');
const {boolean}=require("webidl-conversions");
const ToDo=new mongoose.Schema({
    title:{type:String,
    required:true,
    trim:true
    },
    description:{type:String,
        trim:true
    },
    completed:{type:Boolean,
    default:true
    },
    priority:{type:String,
        enum:["High","Medium","Low"],
        default:"medium"
    },
    duedate:{type:Date,},
    
});

module.exports=mongoose.model("todo",ToDo);