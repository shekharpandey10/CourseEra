const express=require('express')
const Router=express.Router
const {userRouter}=require("./router/user")
    createCourseRoutes:createCourseRoutes
const {courseRouter}=require('./router/course')
const app=express()

app.use('/user',userRouter)
app.use('/course',courseRouter)




app.listen(3000)