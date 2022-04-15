const express = require('express')
const router = express.Router();
const {authUser } = require('../utils/auth')


const {createNewPartner, deletePartner, updateExistingPartner, getAllPartners, uploadOurPartner }  = require('../modules/aboutUs/ourPartners/ourPartners')
const {postOurPartnersHeadingSection, getOurPartnersHeaderSection, updateOurPartnersHeaderSection }  = require('../modules/aboutUs/ourPartners/ourPartnersHeader')
const { ourPartnersPageUpload,postAboutUsOurPartnersPageHeader, postAboutUsOurPartnersPageImage, updateAboutUsOurPartnersPageHeader, updateAboutUsOurPartnersPageImage, getaboutUsOurPartnersPageHeading }  = require('../modules/aboutUs/ourPartners/pageHeading');

const {createNewTeamMember, updateExistingTeamMember, deleteTeamMember, getAllTeamMembers, uploadOurTeam}  = require('../modules/aboutUs/ourTeam/ourTeam')
const {postOurTeamHeadingSection, getOurTeamHeaderSection, updateOurTeamHeaderSection }  = require('../modules/aboutUs/ourTeam/ourTeamHeader')
const { ourTeam,postAboutUsOurTeamPageHeader, postAboutUsOurTeamPageImage, updateAboutUsOurTeamPageHeader, updateAboutUsOurTeamPageImage, getaboutUsOurTeamPageHeading }  = require('../modules/aboutUs/ourTeam/pageHeading');

const {uploadOurStory,updateAboutUsOurStoryTextSection, updateaboutUsOurStoryImageSection, getaboutUsOurStorySection, postaboutUsOurStoryImageSection,postAboutUsOurStoryTextSection} = require('../modules/aboutUs/ourStory/ourStory');
const {postAboutUsOurHistorySection, updateAboutUsOurHistorySection, getaboutUsOurHistorySection} = require('../modules/aboutUs/ourStory/ourHistory');
const {ourStoryUpload,getaboutUsOurStoryPageHeading, updateAboutUsOurStoryPageHeader, updateAboutUsOurStoryPageImage, postAboutUsOurStoryPageHeader, postAboutUsOurStoryPageImage} = require('../modules/aboutUs/ourStory/pageHeading');
const {postAboutUsAssociateText, updateAboutUsAssociateText, getaboutUsAssociate, updateaboutUsAssociateImage} = require('../modules/aboutUs/ourStory/associate');



const {vandMupload,postAboutUsVisionMissionPageHeader, postAboutUsVisionMissionPageImage, updateAboutUsVisionMissionPageHeader, updateAboutUsVisionMissionPageImage, getaboutUsVisionMissionPageHeading } = require('../modules/aboutUs/visionAndMission/pageHeading');
const {aboutUsVisionUpload,getaboutUsVisionSection, updateaboutUsVisionImageSection, updateaboutUsVisionTextSection, postaboutUsVisionImageSection, postaboutUsVisionTextSection } = require('../modules/aboutUs/visionAndMission/vision');
const {aboutUsMissionUpload,getaboutUsMissionSection, updateaboutUsMissionImageSection, updateaboutUsMissionTextSection, postaboutUsMissionImageSection, postaboutUsMissionTextSection } = require('../modules/aboutUs/visionAndMission/mission')


const {getGalleryHeaderSection, updateGalleryHeaderSection, postGalleryHeadingSection} = require('../modules/aboutUs/gallery/galleryHeader')
const {getaboutUsGalleryPageHeading, updateAboutUsGalleryPageHeader, updateAboutUsGalleryPageImage, postAboutUsGalleryPageHeader, postAboutUsGalleryPageImage} = require('../modules/aboutUs/gallery/pageHeading')
const {uploadGalleryImage,createNewPhoto, updateExistingPhoto, deletePhoto, getAllPhoto} = require('../modules/aboutUs/gallery/photos')
const {uploadGalleryVideo,createNewVideo, deleteVideo, getAllVideo, updateExistingVideoFile, updateExistingVideoDetail} = require('../modules/aboutUs/gallery/videos');


router.put('/ourPartners',authUser, uploadOurPartner ,updateExistingPartner)
router.get('/ourPartners' ,getAllPartners)
router.post('/ourPartners',authUser, uploadOurPartner ,createNewPartner)
router.delete('/ourPartners',authUser,deletePartner)

router.get('/ourPartnersHeadingSection', getOurPartnersHeaderSection)
router.put('/ourPartnersHeadingSection',authUser, updateOurPartnersHeaderSection)
router.post('/ourPartnersHeadingSection',authUser,postOurPartnersHeadingSection)

router.get('/ourPartnersPageHeading', getaboutUsOurPartnersPageHeading)
router.put('/ourPartnersPageImage',authUser, ourPartnersPageUpload, updateAboutUsOurPartnersPageImage)
router.put('/ourPartnersPageHeader',authUser, updateAboutUsOurPartnersPageHeader)
router.post('/ourPartnersPageHeader',authUser, postAboutUsOurPartnersPageHeader)
router.post('/ourPartnersPageImage',authUser, ourPartnersPageUpload ,postAboutUsOurPartnersPageImage)





router.put('/ourTeam',authUser, uploadOurTeam ,updateExistingTeamMember)
router.get('/ourTeam' , getAllTeamMembers)
router.post('/ourTeam',authUser, uploadOurTeam ,createNewTeamMember)
router.delete('/ourTeam',authUser, deleteTeamMember)

router.get('/ourTeamHeadingSection', getOurTeamHeaderSection)
router.put('/ourTeamHeadingSection',authUser, updateOurTeamHeaderSection)
router.post('/ourTeamHeadingSection',authUser, postOurTeamHeadingSection)

router.get('/ourTeamPageHeading', getaboutUsOurTeamPageHeading)
router.put('/ourTeamPageImage',authUser, ourTeam, updateAboutUsOurTeamPageImage)
router.put('/ourTeamPageHeader',authUser, updateAboutUsOurTeamPageHeader)
router.post('/ourTeamPageHeader',authUser, postAboutUsOurTeamPageHeader)
router.post('/ourTeamPageImage',authUser, ourTeam ,postAboutUsOurTeamPageImage)





router.get('/ourStoryPageHeading', getaboutUsOurStoryPageHeading)
router.put('/ourStoryPageImage',authUser, ourStoryUpload, updateAboutUsOurStoryPageImage)
router.put('/ourStoryPageHeader',authUser, updateAboutUsOurStoryPageHeader)
router.post('/ourStoryPageHeader',authUser, postAboutUsOurStoryPageHeader)
router.post('/ourStoryPageImage',authUser, ourStoryUpload ,postAboutUsOurStoryPageImage)

router.put('/ourStoryTextSection',authUser, updateAboutUsOurStoryTextSection)
router.put('/ourStoryImageSection',authUser, uploadOurStory,updateaboutUsOurStoryImageSection)
router.get('/ourStorySection',getaboutUsOurStorySection)
router.post('/ourStoryTextSection',authUser, postAboutUsOurStoryTextSection)
router.post('/ourStoryImageSection',authUser, uploadOurStory,postaboutUsOurStoryImageSection)

router.put('/ourHistorySection' ,authUser,updateAboutUsOurHistorySection)
router.get('/ourHistorySection', getaboutUsOurHistorySection)
router.post('/ourHistorySection' ,authUser,postAboutUsOurHistorySection)

router.put('/associateText' ,authUser,updateAboutUsAssociateText)
router.put('/associateImage' ,authUser,uploadOurStory,updateaboutUsAssociateImage)
router.get('/associate', getaboutUsAssociate)
router.post('/associateText' ,authUser,postAboutUsAssociateText)



router.get('/visionMissionPageHeading', getaboutUsVisionMissionPageHeading)
router.put('/visionMissionPageImage',authUser, vandMupload, updateAboutUsVisionMissionPageImage)
router.put('/visionMissionPageHeader',authUser, updateAboutUsVisionMissionPageHeader)
router.post('/visionMissionPageHeader',authUser, postAboutUsVisionMissionPageHeader)
router.post('/visionMissionPageImage',authUser, vandMupload ,postAboutUsVisionMissionPageImage)

router.put('/visionTextSection',authUser, updateaboutUsVisionTextSection)
router.put('/visionImageSection',authUser, aboutUsVisionUpload,updateaboutUsVisionImageSection)
router.get('/visionSection',getaboutUsVisionSection)
router.post('/visionTextSection',authUser, postaboutUsVisionTextSection)
router.post('/visionImageSection',authUser, aboutUsVisionUpload,postaboutUsVisionImageSection)

router.put('/missionTextSection',authUser, updateaboutUsMissionTextSection)
router.put('/missionImageSection',authUser, aboutUsMissionUpload,updateaboutUsMissionImageSection)
router.get('/missionSection', getaboutUsMissionSection)
router.post('/missionTextSection',authUser, postaboutUsMissionTextSection)
router.post('/missionImageSection',authUser, aboutUsMissionUpload,postaboutUsMissionImageSection)





router.put('/video/videoFile',authUser, uploadGalleryVideo ,updateExistingVideoFile)
router.put('/video/videoDetail',authUser, uploadGalleryVideo ,updateExistingVideoDetail)

router.get('/video' , getAllVideo)
router.post('/video',authUser, uploadGalleryVideo ,createNewVideo)
router.delete('/video',authUser, deleteVideo)

router.put('/photo',authUser, uploadGalleryImage ,updateExistingPhoto)
router.get('/photo' , getAllPhoto)
router.post('/photo',authUser, uploadGalleryImage ,createNewPhoto)
router.delete('/photo',authUser, deletePhoto)

router.get('/galleryHeadingSection', getGalleryHeaderSection)
router.put('/galleryHeadingSection',authUser, updateGalleryHeaderSection)
router.post('/galleryHeadingSection',authUser, postGalleryHeadingSection)

router.get('/galleryPageHeading', getaboutUsGalleryPageHeading)
router.put('/galleryPageImage',authUser, uploadGalleryImage, updateAboutUsGalleryPageImage)
router.put('/galleryPageHeader',authUser, updateAboutUsGalleryPageHeader)
router.post('/galleryPageHeader',authUser, postAboutUsGalleryPageHeader)
router.post('/galleryPageImage',authUser, uploadGalleryImage ,postAboutUsGalleryPageImage)




module.exports = router;