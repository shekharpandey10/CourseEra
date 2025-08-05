const mongoose=require('mongoose')
const { number } = require('zod')
const { fi } = require('zod/locales')
const Schema=mongoose.Schema
const ObjectId=mongoose.ObjectId

const user=new Schema({
    userId:ObjectId,
    username:{type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String
})

const admin=new Schema({
    adminId:ObjectId,
    username:{type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String
})

const course=new Schema({
    courseName:String,
    desc:String,
    isActive:Boolean,
    videoUrl:String,
    coursePrice:number,
    adminId:{type:Schema.Types.ObjectId, ref:'admin'}
})

const userModel=mongoose.model('User',user)
const adminModel=mongoose.model('admin',admin)
const coursesModel=mongoose.model('courses',course)

module.exports={
    userModel:userModel,
    adminModel:adminModel,
    coursesModel:coursesModel
}