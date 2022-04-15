const express = require('express')
const router = express.Router();
const {authUser} = require('../utils/auth');

const {memberUpload ,postGetInvolvedMemberImageSection, getGetInvolvedMemberSection, postGetInvolvedMemberTextSection, updateGetInvolvedMemberImageSection, updateGetInvolvedMemberTextSection } = require('../modules/getInvolved/beMember/member');
const {getGetInvolvedMemberPageHeading, updateGetInvolvedMemberPageHeader, updateGetInvolvedMemberPageImage, postGetInvolvedMemberPageHeader, postGetInvolvedMemberPageImage} = require('../modules/getInvolved/beMember/pageHeading');

const {getGetInvolvedSponsorPageHeading, postGetInvolvedSponsorPageHeader, updateGetInvolvedSponsorPageHeader, postGetInvolvedSponsorPageImage, updateGetInvolvedSponsorPageImage } = require('../modules/getInvolved/sponser/pageHeading');
const {SponsorUpload, postGetInvolvedSponsorImageSection, postGetInvolvedSponsorTextSection, getGetInvolvedSponsorSection, updateGetInvolvedSponsorImageSection, updateGetInvolvedSponsorTextSection } = require('../modules/getInvolved/sponser/sponsor');

const {getGetInvolvedSupportPageHeading, postGetInvolvedSupportPageHeader, postGetInvolvedSupportPageImage, updateGetInvolvedSupportPageHeader, updateGetInvolvedSupportPageImage} = require('../modules/getInvolved/support/pageHeading');
const {supportUpload,getGetInvolvedSupportSection, postGetInvolvedSupportImageSection, postGetInvolvedSupportTextSection, updateGetInvolvedSupportImageSection, updateGetInvolvedSupportTextSection} = require('../modules/getInvolved/support/support');


const {getGetInvolvedSupportPagePageHeading, updateGetInvolvedSupportPagePageHeader, updateGetInvolvedSupportPagePageImage, postGetInvolvedSupportPagePageHeader, postGetInvolvedSupportPagePageImage} = require('../modules/getInvolved/supportPage/pageHeading');
const {uploadSupportPage,getAllSupportPage, createSupportPage, updateExistingSupportPage, deleteSupportPage} = require('../modules/getInvolved/supportPage/supportPage')
const {getSupportPageHeaderSection, updateSupportPageHeaderSection, postSupportPageHeadingSection} = require('../modules/getInvolved/supportPage/supportPageHeader');

const {getDonateHeaderSection, updateDonateHeaderSection, postDonateHeadingSection} = require('../modules/getInvolved/doanatePage/donateHeader');
const {getGetInvolvedDonatePageHeading, updateGetInvolvedDonatePageHeader, updateGetInvolvedDonatePageImage, postGetInvolvedDonatePageHeader, postGetInvolvedDonatePageImage} = require('../modules/getInvolved/doanatePage/pageHeading');
const { uploadDonate,createDonate, getAllDonate, updateExistingDonate, deleteDonate} = require('../modules/getInvolved/doanatePage/donate')


router.get('/memberPageHeading', getGetInvolvedMemberPageHeading)
router.put('/memberPageImage',authUser,memberUpload, updateGetInvolvedMemberPageImage)
router.put('/memberPageHeader',authUser, updateGetInvolvedMemberPageHeader)
router.post('/memberPageHeader',authUser, postGetInvolvedMemberPageHeader)
router.post('/memberPageImage',authUser, memberUpload ,postGetInvolvedMemberPageImage)

router.put('/memberTextSection',authUser, updateGetInvolvedMemberTextSection)
router.put('/memberImageSection',authUser, memberUpload,updateGetInvolvedMemberImageSection)
router.get('/memberSection',getGetInvolvedMemberSection)
router.post('/memberTextSection',authUser, postGetInvolvedMemberTextSection)
router.post('/memberImageSection',authUser,memberUpload,postGetInvolvedMemberImageSection)




router.get('/sponsorPageHeading', getGetInvolvedSponsorPageHeading)
router.put('/sponsorPageImage',authUser,SponsorUpload, updateGetInvolvedSponsorPageImage)
router.put('/sponsorPageHeader', authUser,updateGetInvolvedSponsorPageHeader)
router.post('/sponsorPageHeader',authUser, postGetInvolvedSponsorPageHeader)
router.post('/sponsorPageImage',authUser, SponsorUpload ,postGetInvolvedSponsorPageImage)

router.put('/sponsorTextSection',authUser, updateGetInvolvedSponsorTextSection)
router.put('/sponsorImageSection',authUser, SponsorUpload,updateGetInvolvedSponsorImageSection)
router.get('/sponsorSection',getGetInvolvedSponsorSection)
router.post('/sponsorTextSection',authUser, postGetInvolvedSponsorTextSection)
router.post('/sponsorImageSection',authUser,SponsorUpload,postGetInvolvedSponsorImageSection)




router.get('/supportPageHeading', getGetInvolvedSupportPageHeading)
router.put('/supportPageImage',authUser,supportUpload, updateGetInvolvedSupportPageImage)
router.put('/supportPageHeader',authUser,updateGetInvolvedSupportPageHeader)
router.post('/supportPageHeader',authUser, postGetInvolvedSupportPageHeader)
router.post('/supportPageImage', authUser,supportUpload ,postGetInvolvedSupportPageImage)

router.put('/supportTextSection',authUser, updateGetInvolvedSupportTextSection)
router.put('/supportImageSection', authUser,supportUpload,updateGetInvolvedSupportImageSection)
router.get('/supportSection',getGetInvolvedSupportSection)
router.post('/supportTextSection',authUser, postGetInvolvedSupportTextSection)
router.post('/supportImageSection',authUser,supportUpload,postGetInvolvedSupportImageSection)




router.put('/supportPage', authUser ,uploadSupportPage ,updateExistingSupportPage)
router.get('/supportPage' ,getAllSupportPage)
router.post('/supportPage', authUser, uploadSupportPage ,createSupportPage)
router.delete('/supportPage',authUser, deleteSupportPage)

router.get('/supportPagePageHeading', getGetInvolvedSupportPagePageHeading)
router.put('/supportPagePageImage',authUser,uploadSupportPage, updateGetInvolvedSupportPagePageImage)
router.put('/supportPagePageHeader', authUser,updateGetInvolvedSupportPagePageHeader)
router.post('/supportPagePageHeader',authUser, postGetInvolvedSupportPagePageHeader)
router.post('/supportPagePageImage',authUser, uploadSupportPage ,postGetInvolvedSupportPagePageImage)

router.get('/supportPageHeadingSection', getSupportPageHeaderSection)
router.put('/supportPageHeadingSection', authUser,updateSupportPageHeaderSection)
router.post('/supportPageHeadingSection', authUser,postSupportPageHeadingSection)





router.put('/donate', authUser ,uploadDonate ,updateExistingDonate)
router.get('/donate' ,getAllDonate)
router.post('/donate', authUser, uploadDonate ,createDonate)
router.delete('/donate',authUser, deleteDonate)

router.get('/donatePageHeading', getGetInvolvedDonatePageHeading)
router.put('/donatePageImage',authUser,uploadDonate, updateGetInvolvedDonatePageImage)
router.put('/donatePageHeader', authUser,updateGetInvolvedDonatePageHeader)
router.post('/donatePageHeader',authUser, postGetInvolvedDonatePageHeader)
router.post('/donatePageImage',authUser, uploadDonate ,postGetInvolvedDonatePageImage)

router.get('/donateHeadingSection', getDonateHeaderSection)
router.put('/donateHeadingSection', authUser,updateDonateHeaderSection)
router.post('/donateHeadingSection', authUser,postDonateHeadingSection)






module.exports = router;