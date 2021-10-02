const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Invalid email format ')
        }
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG']))
                throw new Error('Not an Egyptian number')
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },

    age:{
        type:Number,
        validate(value){
            if(value < 21)
                throw new Error('Too young')
        }
    },

    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
    
},
{timestamps:true}
)

userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}

userSchema.pre('save', async function(){
    const user = this
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 12)
})


userSchema.statics.loginUser = async(email, password)=>{
    const user = await User.findOne({email})
    if(!user) 
         throw new Error('Invalid email')
 
    const isValidPass = await bcrypt.compare(password, user.password)
 
    if(!isValidPass) 
         throw new Error('Invalid Password')
         
     return user
 }

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User