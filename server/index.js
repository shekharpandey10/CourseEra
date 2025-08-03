const express=require('express')
require('dotenv').config()
const {userRouter}=require("./router/user")
const {courseRouter}=require('./router/course')
const {adminRouter}=require('./router/admin')
const { default: mongoose } = require('mongoose')
const app=express()
app.use(express.json())
app.use('/api/v1/user',userRouter)
app.use('/api/v1/course',courseRouter)
app.use('/api/v1/admin',adminRouter)




async function main (){
   try{
     await mongoose.connect(process.env.MONGO_URL)
   }catch(e){
    throw new Error("database connection failed")
   }
   console.log('connected to db')
   app.listen(process.env.PORT,()=>{
    console.log("server is running at: ",process.env.PORT)
})
}
main()