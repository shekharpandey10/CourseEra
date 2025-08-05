const {z}=require('zod')
const jwt=require('jsonwebtoken')
const { userModel, adminModel } = require('../db/userdb')


const signUpValid=async(req,res,next)=>{
    const {username,password,firstname,lastname}=req.body
   const admin= z.object({
        username:z.email(),
        password:z.string().min(8),
        firstname:z.string(),
        lastname:z.string()
    })

    try{
        const resp=await admin.safeParse({username:username,password:password,firstname:firstname,lastname:lastname})
        if(resp.success){
            console.log('sucess')
            next()
        }else{
            res.json({error:resp.error})
        }

    }catch(e){
        res.json({
            msg:"Invalid format",
            error:e
        })
    }

}


const validInputAdmin = async (req, res, next) => {
    const admin = z.object({
        username: z.email(),
        password: z.string().min(8)
    })
    const { username, password } = req.body
    try {
        const resp = await admin.safeParse({
            username: username,
            password: password
        })
        if (resp.success) next()
        else res.json({ msg: "Invalid format" })
    } catch (e) {
        res.json({
            data: [],
            error: e
        })
    }
}

const authAdmin=async(req,res,next)=>{
    const {username,password}=req.body
    try{
      const user= await adminModel.findOne({username:username})
      console.log(user)
      if(user){
        req.pass=user.password;
        req._id=user._id.toString()
        next()
      }else{
        res.json({
            data:[],
            msg:"User not exists please signUp"
        })
      }
    }catch(e){
        res.json({
            data:[],
            error:e
        })
    }
}

const tokenAuth=async(req,res,next)=>{
   const token= req.headers.authorization.split(' ')[1]
  console.log(token)
  try{
    const result=await jwt.verify(token,process.env.ADMIN_SECRET)
    if(result){
        req.adminId=await jwt.decode(token)
        next()
    }
  }catch(e){
    res.json({
        data:[],
        error:e
    })
  }
   
}
module.exports={
    signUpValid:signUpValid,
    validInputAdmin:validInputAdmin,
    authAdmin:authAdmin,
    tokenAuth:tokenAuth
}