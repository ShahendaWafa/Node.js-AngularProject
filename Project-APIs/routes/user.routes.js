const router = require('express').Router()
const userController = require('../controller/user.controller')
const auth = require('../middleware/auth')


router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logoutAll', auth, userController.logoutAll)
router.post('/logout', auth, userController.logout)
router.post('/me',auth,userController.me)

module.exports = router