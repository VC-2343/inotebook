const express=require('express');
const router=express.Router();
const getuser=require('../middleware/getuser.js');
const Notes=require('../models/Notes.js');
const { body, validationResult } = require('express-validator');

// route1
router.get('/fetchnotes',getuser,async(req,res)=>{
const notes = await Notes.find({ user: req.user.id }).maxTimeMS(5000);;

res.json(notes);
})

// route2
router.post('/addnote',getuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be more than 5 characters').isLength({min:5}),
], async(req,res)=>{
    try{
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
   const note=new Notes({
title,description,tag,user:req.user.id
   })
   const savednote=await note.save(); 
    res.json(savednote);}
    catch(error){
         console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" });

    }
})

// router3
router.put('/updatenote/:id', getuser, async (req, res) => {
  const { title, description, tag } = req.body;

  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
    
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" }); 
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error("Error updating note:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// route4 
router.delete('/deletenote/:id', getuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized user" });
    }
    await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports=router;