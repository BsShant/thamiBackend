const express = require('express')
const router = express.Router();
const {register,login, getMe, logout, forgotPassword, resetPassword, changePassword, changeEmail, changeUsername} = require('../controllers/auth');
const {authUser} = require('../utils/auth');

router.post('/register', register)
router.post('/login', login)
router.get('/me', authUser,getMe)
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.post('/changePassword',authUser, changePassword)
router.post('/changeEmail',authUser, changeEmail)
router.post('/changeUsername',authUser, changeUsername)



module.exports = router;