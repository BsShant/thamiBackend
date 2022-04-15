const express = require('express')
const router = express.Router();
const {authUser} = require('../utils/auth');

const {updatePublicationResourcesPageHeader, updatePublicationResourcesPageImage, postPublicationResourcesPageHeader,postPublicationResourcesPageImage, getPublicationResourcesPageHeading}  = require('../modules/publication/resources/pageHeading');
const {uploadpublicationResources,createResources, updateExistingResources, deleteResources, getAllResources } = require('../modules/publication/resources/resources');
const {postResourcesHeadingSection, getResourcesHeaderSection, updateResourcesHeaderSection} = require('../modules/publication/resources/resourcesHeader');

const {updatePublicationPressReleasePageHeader, updatePublicationPressReleasePageImage, postPublicationPressReleasePageHeader, postPublicationPressReleasePageImage, getPublicationPressReleasePageHeading} = require('../modules/publication/pressRelease/pageHeading')
const {uploadpublicationPressRelease, createPressRelease, updateExistingPressRelease, deletePressRelease, getAllPressRelease } = require('../modules/publication/pressRelease/pressRelease');
const {postPressReleaseHeadingSection, getPressReleaseHeaderSection, updatePressReleaseHeaderSection} = require('../modules/publication/pressRelease/pressReleaseHeader');

const {uploadBooks,createBooks, deleteBooks, getAllBooks, updateExistingBookDetail, updateExistingBookFile } = require('../modules/publication/books/books');
const {postBooksHeadingSection, getBooksHeaderSection, updateBooksHeaderSection } = require('../modules/publication/books/booksHeader');
const {booksImageUpoad,updatePublicationBooksPageHeader, updatePublicationBooksPageImage, getPublicationBooksPageHeading, postPublicationBooksPageHeader, postPublicationBooksPageImage} = require('../modules/publication/books/pageHeading');




router.put('/resources', authUser ,uploadpublicationResources ,updateExistingResources)
router.get('/resources' ,getAllResources)
router.post('/resources', authUser, uploadpublicationResources ,createResources)
router.delete('/resources',authUser, deleteResources)

router.get('/resourcesPageHeading', getPublicationResourcesPageHeading)
router.put('/resourcesPageImage',authUser,uploadpublicationResources, updatePublicationResourcesPageImage)
router.put('/resourcesPageHeader', authUser,updatePublicationResourcesPageHeader)
router.post('/resourcesPageHeader',authUser, postPublicationResourcesPageHeader)
router.post('/resourcesPageImage',authUser, uploadpublicationResources ,postPublicationResourcesPageImage)

router.get('/resourcesHeadingSection', getResourcesHeaderSection)
router.put('/resourcesHeadingSection', authUser,updateResourcesHeaderSection)
router.post('/resourcesHeadingSection', authUser,postResourcesHeadingSection)




router.put('/pressRelease', authUser ,uploadpublicationPressRelease ,updateExistingPressRelease)
router.get('/pressRelease' ,getAllPressRelease)
router.post('/pressRelease', authUser, uploadpublicationPressRelease ,createPressRelease )
router.delete('/pressRelease',authUser, deletePressRelease)

router.get('/pressReleasePageHeading', getPublicationPressReleasePageHeading)
router.put('/pressReleasePageImage',authUser,uploadpublicationPressRelease, updatePublicationPressReleasePageImage)
router.put('/pressReleasePageHeader', authUser,updatePublicationPressReleasePageHeader)
router.post('/pressReleasePageHeader',authUser, postPublicationPressReleasePageHeader)
router.post('/pressReleasePageImage',authUser, uploadpublicationPressRelease ,postPublicationPressReleasePageImage)

router.get('/pressReleaseHeadingSection', getPressReleaseHeaderSection)
router.put('/pressReleaseHeadingSection', authUser,updatePressReleaseHeaderSection)
router.post('/pressReleaseHeadingSection', authUser,postPressReleaseHeadingSection)




router.put('/books/bookDetail', authUser ,uploadBooks ,updateExistingBookDetail)
router.put('/books/bookFile', authUser ,uploadBooks ,updateExistingBookFile)

router.get('/books' ,getAllBooks)
router.post('/books', authUser, uploadBooks ,createBooks )
router.delete('/books',authUser, deleteBooks)

router.get('/booksPageHeading', getPublicationBooksPageHeading)
router.put('/booksPageImage',authUser,booksImageUpoad, updatePublicationBooksPageImage)
router.put('/booksPageHeader', authUser,updatePublicationBooksPageHeader)
router.post('/booksPageHeader',authUser, postPublicationBooksPageHeader)
router.post('/booksPageImage',authUser, booksImageUpoad ,postPublicationBooksPageImage)

router.get('/booksHeadingSection', getBooksHeaderSection)
router.put('/booksHeadingSection', authUser,updateBooksHeaderSection)
router.post('/booksHeadingSection', authUser,postBooksHeadingSection)



module.exports = router;