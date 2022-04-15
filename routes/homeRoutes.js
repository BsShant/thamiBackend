const express = require('express')
const router = express.Router();
const {authUser} = require('../utils/auth')
const {updateHeroSection, getHeroSection} = require('../controllers/home');
const {gethomeAboutUsSection
    , aboutUsUpload, posthomeAboutUsTextSection, posthomeAboutUsImageSection
    , updatehomeAboutUsTextSection, updatehomeAboutUsImageSection} = require('../modules/home/aboutUs');
const {gethomeOurEventSection, posthomeOurEventSection, updatehomeOurEventHeadingSection, updatehomeOurEventCardSection } = require('../modules/home/ourEvents');
const {gethomePublicationSection
    , publicationUpload, posthomePublicationTextSection, posthomePublicationImageSection
    , updatehomePublicationTextSection, updatehomePublicationImageSection} = require('../modules/home/publication');
const {getInvolvedUpload, gethomegetInvolvedSection,
     updatehomegetInvolvedCardTextSection, updatehomegetInvolvedHeadingSection, updatehomegetInvolvedCardImageSection, posthomeGetInvolvedTextSection } = require('../modules/home/getInvolved');



router.put('/heroSection',authUser, updateHeroSection)
router.get('/heroSection', getHeroSection)

router.put('/aboutUsTextSection',authUser,updatehomeAboutUsTextSection)
router.put('/aboutUsImageSection', authUser,aboutUsUpload ,updatehomeAboutUsImageSection)
router.get('/aboutUsSection', gethomeAboutUsSection)
router.post('/aboutUsTextSection' ,authUser,posthomeAboutUsTextSection)
router.post('/aboutUsImageSection',authUser,aboutUsUpload,posthomeAboutUsImageSection)

router.get('/ourEventSection', gethomeOurEventSection)
router.post('/ourEventSection' ,authUser,posthomeOurEventSection)
router.put('/ourEventHeadingSection',authUser,updatehomeOurEventHeadingSection)
router.put('/ourEventCardSection',authUser,updatehomeOurEventCardSection)

router.put('/publicationTextSection',authUser,updatehomePublicationTextSection)
router.put('/publicationImageSection',authUser,publicationUpload ,updatehomePublicationImageSection)
router.get('/publicationSection', gethomePublicationSection)
router.post('/publicationTextSection' ,authUser,posthomePublicationTextSection)
router.post('/publicationImageSection',authUser,publicationUpload,posthomePublicationImageSection)

router.get('/getInvolvedSection', gethomegetInvolvedSection)
router.post('/getInvolvedTextSection' ,authUser,posthomeGetInvolvedTextSection)
router.put('/getInvolvedHeadingSection',authUser,updatehomegetInvolvedHeadingSection)
router.put('/getInvolvedCardTextSection',authUser,updatehomegetInvolvedCardTextSection)
router.put('/getInvolvedCardImageSection', authUser,getInvolvedUpload,updatehomegetInvolvedCardImageSection)





module.exports = router;