const express = require('express')
const router = express.Router();
const {authUser } = require('../utils/auth')
const {image, uploadSingle } = require('../controllers/image')

router.post('/' ,authUser,  uploadSingle, image)

module.exports = router;