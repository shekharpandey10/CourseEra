const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ObjectId=mongoose.ObjectId
mongoose.connect('mongodb+srv://user:147258369@cluster0.p3qerxx.mongodb.net/CourseSelling')

const user=new Schema({
    userId:ObjectId,
    Email:{type:String,unique:true},
    password:String,
    name:String
})

const admin=new Schema({
    Email:{type:String,unique:true},
    password:String,
})

const course=new Schema({
    courseName:String,
    adminId:ObjectId
})

const UserModel=mongoose.model('User',user)
const AdminMolde=mongoose.model('admin',admin)
const CoursesModel=mongoose.model('courses',course)

module.exports={
    UserModel:UserModel,
    AdminMolde:AdminMolde,
    CoursesModel:CoursesModel
}