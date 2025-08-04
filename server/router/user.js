const express = require('express')
const { userModel } = require('../db/userdb')
const {validInput,userAuth}=require('../middleware/userLoginAuth')
const { z } = require('zod')
const { model } = require('mongoose')

const Router = express.Router
const userRouter = Router()
userRouter.use(express.json())



const userValid=async(req,res,next)=>{
    const user=z.object({
        username:z.email(),
        password:z.string().min(8).max(30),
        firstname:z.string().max(30),
        lastname:z.string().max(20)
    })
    const {username,password,firstname,lastname}=req.body
    try{
        const ans=await user.safeParse({username:username,password:password,firstname:firstname,lastname:lastname})
        if(ans.success)
            next()
        else res.json({error:ans.error})
    }catch(e){
        res.json({
            msg:"Invalid format",
            error:e
        })
    }

}
userRouter.post('/signup',userValid,async(req,res,next)=>{
    const {username}=req.body
    try{
      const user=  await userModel.findOne({username:username})
      if(!user){
        next()
      }else{
        res.json({
            msg:"user is already exists"
        })
      }
    }catch(e){
        res.json({
            data:[],
            error:e
        })
    }
}, async (req, res) => {
   const {username,password,firstname,lastname}=req.body
    try{
         await userModel.create({
        username:username,
        password:password,
        firstname:firstname,
        lastname:lastname
    })
    res.status(200).json({
        message: "Signup sucessfully"
    })
    }catch(e){
        res.json({
            data:[],
            error:e
        })
    }
})


userRouter.post('/login',validInput,userAuth, async(req, res) => {
    res.json({
        message:"signin endpoint"
    })
})

userRouter.get('/courses', (req, res) => {
    res.json({
        message:"list"
    })
})

module.exports={
    userRouter:userRouter
}