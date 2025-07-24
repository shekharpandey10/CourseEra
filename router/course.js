const {Router}=require('express')
const courseRouter=Router()

    courseRouter.get('/purchase',(req,res)=>{

    })

    courseRouter.get('/preview',(req,res)=>{
        res.json({
            message:""
        })
    })


module.exports={
    courseRouter:courseRouter
}