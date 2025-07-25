const mongoose=require('mongoose');
const { Schema }=mongoose;
const notesschema=new Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:"user",
    },
title:{
type:String,
required:true
},
tag:{
type:String,
default:'general'
},
description:{
type:String,
required:true
},
date:{
type:Date,
default:Date.now
},
});
module.exports=mongoose.model('notes',notesschema);