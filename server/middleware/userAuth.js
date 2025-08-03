
const {userModel}=require('../db/userdb')

const userAuth=(req,res,next)=>{
    const {username}=req.body

    try{
        userModel.findOne()
    }
     
}