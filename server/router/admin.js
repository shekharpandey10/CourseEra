const express = require('express')
const Router = express.Router
const adminRouter = Router()
const jwt=require('jsonwebtoken')
const app = express()
const bcrypt = require('bcrypt')
const { adminAuth, validInput } = require('../middleware/userLoginAuth')
const { signUpValid,validInputAdmin,authAdmin,tokenAuth } = require('../middleware/adminValid')
const { adminModel,coursesModel } = require('../db/userdb')


adminRouter.post('/signUp', signUpValid, async (req, res, next) => {
    const { username } = req.body
    try {
        const user = await adminModel.findOne({ username: username })
        if (!user) {
            next()

        } else {
            res.json({
                msg: "user is already exists"
            })
        }
    } catch (e) {
        res.json({
            data: [],
            error: e
        })
    }
}, async (req, res) => {

    const { username, password, firstname, lastname } = req.body
    try {
        const hasedPass = await bcrypt.hash(password, 5)
         await adminModel.create({
            username: username,
            password: hasedPass,
            firstname: firstname,
            lastname: lastname
        })
      
        res.status(200).json({
            message: "Signup sucessfully"
        })
    } catch (e) {
        res.json({
            data: [],
            error: e
        })
    }
})

adminRouter.post('/login',validInputAdmin,authAdmin, async(req, res) => {
     const {username,password}=req.body
     try{
        const match=await bcrypt.compare(password,req.pass)
        if(match){
               const token= await jwt.sign(req._id,process.env.ADMIN_SECRET)
               res.json({
                token:token,
                msg:"login Succesfull"
               })
        }else{
            res.json({
                data:[],
                msg:"logIn failed"
            })
        } 
     }catch(e){
        res.json({
            data:[],
            error:e
        })
     }
})

adminRouter.post('/addCourse',tokenAuth,async(req, res) => {
    console.log(req.body)
  const {courseName,desc,videoUrl,coursePrice}=req.body
  console.log('hii')
  try{
    const resp=await coursesModel.create({
        courseName:courseName,
        desc:desc,
        videoUrl:videoUrl,
        isActive:true,
        coursePrice:coursePrice,
        adminId:req.adminId
    })
    console.log(resp)
    res.json({
        msg:"Course added"
    })
  }catch(e){
    res.json({
        data:[],
        error:e
    })
  }

})
adminRouter.put('/updateCourse',tokenAuth, async(req, res) => {
    const {courseId}=req.body
console.log(courseId)
    try{
        const course=await coursesModel.findOne({_id:courseId})
        console.log(course)
        if(course){
            course.isActive=false
            console.log('hello')
            await course.save()
            console.log('helo')
            res.json({
                msg:"Course updated sucessfully"
            })
        }else{
            res.json({
                msg:"course not found"
            })
        }
    }catch(e){
        res.json({
            data:[],
            error:e
        })
    }
})  
adminRouter.get('/list', tokenAuth,async(req, res) => {
    const adminId=req.adminId
    try{
      const course=await coursesModel.find({adminId:adminId})
      if(course.length){
        res.json({
            msg:"list of course is:",
            data:course
        })
      }else{
        res.json({
            msg:"No course found"
        })
      }
    }catch(e){
        res.json({
            data:[],
            error:e
        })
    }
})

module.exports = {
    adminRouter: adminRouter
}