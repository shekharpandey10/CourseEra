const express = require('express')
const { UserModel } = require('../db/userdb')
const { z } = require('zod')
const { model } = require('mongoose')
const Router = express.Router
const userRouter = Router()




userRouter.post('/signUp', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name

    console.log(req.body)
    await UserModel.create({
        username,
        password,
        name
    }).catch((e) => {
        res.json({ error: e })

    })
    res.json({
        message: "Signup sucessfully"
    })
})
userRouter.post('/signIn', (req, res) => {
    res.json({
        message:"signin endpoint"
    })
})

userRouter.get('/courses', (req, res) => {
    res.json({
        message:"list"
    })
})

module.exports={
    userRouter:userRouter
}