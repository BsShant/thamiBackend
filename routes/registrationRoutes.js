const express = require('express')
const router = express.Router();
const {getRegistration, deleteRegistration, approveRegistration
    , applyRegistration, rejectRegistration } = require("../controllers/registration")
    const {authUser} = require('../utils/auth');


router.get('/registration' , getRegistration)
router.post('/registration',  applyRegistration )
router.delete('/registration',authUser, deleteRegistration)
router.put('/registration/approve',authUser, approveRegistration)
router.put('/registration/reject',authUser, rejectRegistration)


module.exports = router;