const {z}=require('zod')
const { use } = require('react')
const { userModel } = require('../db/userdb')


const validInput = async (req, res, next) => {
    const user = z.object({
        username: email(),
        password: z.string().min(8)
    })
    const { username, password } = req.body
    try {
        const resp = await user.safeParse({
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

const userAuth = async (req, res, next) => {
    const { username } = req.body
    try {
        const user = await userModel.findOne({ username: username })
        console.log(user)
        if(user)
        next()
        else{
            res.json({
                msg:"Incorrect credintials"
            })
        }
    } catch (e) {
        res.json({
            data:[],
            error:e
        })
    }

}