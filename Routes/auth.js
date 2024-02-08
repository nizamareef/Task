const express=require('express')
const User = require('../Model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtVerify = require('../Middleware/jwtverify');
const router=express.Router()
const jwt_secret='TASK'

//Route-1 <---------SignUp-Route-----------------//

router.post('/signup',async(req,res)=>{
    try{
        const{name,email,password}=req.body
        //Check weather the user is already exist
        const user= await User.findOne({email})
        if(user) return res.status(400).json({'message':"Email is already registered"})

        //Hash the password
        const salt= bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(password,salt)
        // Create a new user
        const newUser= await User.create({name,email,password:hash})
        const data ={
            newUser:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        }
        //Genertaing the JWT token 
        var authtoken = jwt.sign(data, jwt_secret);

        return res.status(200).json({authtoken})

    }
    catch(err){
        res.status(400).json(err)
        console.log("error in creating the user ")
    }
})

//Route-2 <---------Login Route-------------->//
router.post('/login', async(req,res)=>{
    try {
        const {email,password}=req.body

        //Check weather the user exist or not 
        const user=await User.findOne({email})
        if(!user){
             res.status(400).json({'message':'Enter the valid user credentials'})
        }
        //Compare the paswords using the bcrypt
        const passwordcompare= await bcrypt.compare(password,user.password)
        if(!passwordcompare){
             res.status(400).json({'message':'Enter the valid credentials'})}
        const data={
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email

                }
            }
        //Generate the JWT token 
        var authtoken = jwt.sign(data, jwt_secret);

        res.status(200).json({authtoken})
        }
     catch (error) {
        res.status(400).json({'message':'internal error'})
    }
})

//Route-3 //<---------User Details-------------->//
router.get('/userdetails',jwtVerify,async(req,res)=>{
    //Verifying the Token using jwtVerify middleware to get the userId
    let userId= req.user.id
    try {
        const userdetails=await User.findById(userId).select('-password')
    res.status(200).json(userdetails)

    } catch (error) {
        res.status(400).json('Internal error')
    }
    
})

// Route-4 //<---------Update profile------------->//
router.put("/updateprofile",jwtVerify, async (req, res) =>{
const  {name,email}=req.body;
let userId=req.user.id;
try {
    const updateprofile= await User.findByIdAndUpdate(userId,{name,email})
    res.status(200).json({updateprofile})
} catch (error) {
    res.status(400).json('Internal error')
}
}) 
module.exports=router