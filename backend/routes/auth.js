const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
const { selectFields } = require('express-validator/lib/field-selection');
var getuser=require("../middleware/getuser")

const JWT_SECRET="hellohereiam";

// route1
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
       
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
const salt=await bcrypt.genSalt(10);
     const securepw= await bcrypt.hash(req.body.password,salt);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securepw
        });
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
      res.json({authToken})

        return res.json({ message: "User created successfully", user });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// route2
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
      body('password', 'password cannot be empty').exists()
], async (req, res) => {
       let success=false; 
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){return res.status(400).json({error:"user does not exists"})}  
     const comparepw=await bcrypt.compare(password,user.password);
     if(!comparepw){
     
       return res.status(400).json({success,error:"enter correct password"}) 
     }   
      const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
          res.json({success,authToken});
    }
    catch(error){
console.error(error.message);
res.status(500).send("some error occurred") ;   }

})


// route3
router.post('/getuser',getuser, async (req, res) =>{
try{
userId=req.user.id;
const user=await User.findById(userId).select("-password");
res.send(user);
}
catch(error){
console.error(error.message);
res.status(500).send("some error occurred") ;   }})

module.exports = router;
