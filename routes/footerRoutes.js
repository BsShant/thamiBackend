const express = require('express')
const router = express.Router();
const {authUser } = require('../utils/auth')

const {createFooterAboutUs, FetchFooterAboutUs, updateFooterAboutUs} = require('../modules/footer/aboutUs')
const {FetchFooterContact, updateFooterContact, createFooterContact} = require('../modules/footer/contact')
const {FetchFooterGetInvolved, createFooterGetInvolved, updateFooterGetInvolved} = require('../modules/footer/getInvolved')
const {createFooterSocialMedia, updateFacebook, updateInsta
    , updateTwitter, updateYoutube, FetchFooterSocialMedia} = require('../modules/footer/socialMedia')

router.post('/aboutUs' ,authUser,createFooterAboutUs)
router.get('/aboutUs' ,FetchFooterAboutUs)
router.put('/aboutUs' ,authUser,updateFooterAboutUs)

router.post('/contact' ,authUser,createFooterContact)
router.get('/contact' ,FetchFooterContact)
router.put('/contact' ,authUser,updateFooterContact)

router.post('/socialMedia' ,authUser,createFooterSocialMedia)
router.get('/socialMedia' ,FetchFooterSocialMedia)
router.put('/socialMedia/facebook' ,authUser,updateFacebook)
router.put('/socialMedia/twitter' ,authUser,updateTwitter)
router.put('/socialMedia/instagram' ,authUser,updateInsta)
router.put('/socialMedia/youtube' ,authUser,updateYoutube)

router.post('/getInvolved' ,authUser,createFooterGetInvolved)
router.get('/getInvolved' ,FetchFooterGetInvolved)
router.put('/getInvolved' ,authUser,updateFooterGetInvolved)


module.exports = router;




module.exports = router;