const express = require('express')
const app = express()

require('dotenv').config()
require('../models/db/connection')

const userRoutes = require("../routes/user.routes")
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(userRoutes)
app.use('/user', userRoutes)

module.exports = app