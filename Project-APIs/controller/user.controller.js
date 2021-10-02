const User = require('../models/user.model')

const register =  async(req, res)=>{
    try{
        const userData = new User(req.body)
        await userData.save()
        res.status(200).send({
            apiStatus: true,
            data: userData,
            message: "Data added successfully"
        })
    }catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in register"
        })
    }
}

const login = async(req, res)=>{
    try{
        let user = await User.loginUser(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({
            apiStatus: true,
            data: {user, token},
            message:"logged in"
        })
    
    }catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message:"Cannot log in"
        })
    }
}

const logoutAll = async(req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send({
            apiStatus: true,
            data: "",
            message: "Logged out from all devices"
        })

    }catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: 'error'
        })
    }
}

const logout = async(req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter(singletoken=>{
            return singletoken.token != req.token
        })
        await req.user.save()
        res.send({
            apiStatus: true,
            data: "",
            message: "Logged out from this device "
        })

    }catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: 'error'
        })
    } 
}

const me = async(req,res)=>{ res.send(req.user) }

module.exports = {
    register, login, logout, logoutAll, me
}