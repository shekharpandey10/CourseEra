const express=require('express')
const Router=express.Router
const adminRouter=Router()
const app=express()

adminRouter.post('/signUp',(req,res)=>{
res.json({
    message:"hello"
})
})

adminRouter.post('/signIn',(req,res)=>{

})

adminRouter.put('/addCourse',(req,res)=>{

})
adminRouter.delete('/delCourse',(req,res)=>{

})
adminRouter.get('/lsit',(req,res)=>{
    
})

module.exports={
    adminRouter:adminRouter
}