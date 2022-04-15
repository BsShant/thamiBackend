const express = require('express')
const router = express.Router();
const {authUser} = require('../utils/auth');

const {postMessage, sendMessage, deleteMessage, getMessage } = require('../modules/contact/contact');
const {postContactHeadingSection, getContactHeaderSection, updateContactHeaderSection } = require('../modules/contact/contactHeader');
const {ContactImageUpoad,updateContactPageHeader, updateContactPageImage, getContactPageHeading, postContactPageHeader,postContactPageImage} = require('../modules/contact/pageHeading');


// router.post('/contact', authUser ,sendMessage)
router.get('/contact' , getMessage)
router.post('/contact',  postMessage )
router.delete('/contact',authUser, deleteMessage)

router.get('/contactPageHeading', getContactPageHeading)
router.put('/contactPageImage',authUser,ContactImageUpoad, updateContactPageImage)
router.put('/contactPageHeader', authUser,updateContactPageHeader)
router.post('/contactPageHeader',authUser, postContactPageHeader)
router.post('/contactPageImage',authUser, ContactImageUpoad ,postContactPageImage)

router.get('/contactHeadingSection', getContactHeaderSection)
router.put('/contactHeadingSection', authUser,updateContactHeaderSection)
router.post('/contactHeadingSection', authUser,postContactHeadingSection)


module.exports = router;