const express = require('express')
const router = express.Router();
const {authUser} = require('../utils/auth')

const {getEventNewsPageHeading, updateEventNewsPageHeader, updateEventNewsPageImage, postEventNewsPageHeader, postEventNewsPageImage } =  require('../modules/event/news/pageHeading');
const {createNews, updateExistingNews, deleteNews, getAllNews, uploadEventNews, updateNewsAuthorBox }  = require('../modules/event/news/news')

const {getEventBlogsPageHeading, updateEventBlogsPageHeader, updateEventBlogsPageImage, postEventBlogsPageHeader, postEventBlogsPageImage } = require('../modules/event/blogs/pageHeading');
const {createBlogs, updateExistingBlogs, deleteBlogs, getAllBlogs, uploadEventBlogs, updateBlogsAuthorBox } = require('../modules/event/blogs/blogs');

const {getEventOurArticlesPageHeading,updateEventOurArticlesPageHeader, updateEventOurArticlesPageImage, postEventOurArticlesPageHeader, postEventOurArticlesPageImage } = require('../modules/event/ourArticles/pageHeading');
const {createOurArticles, updateExistingOurArticles, deleteOurArticles, getAllOurArticles, uploadEventOurArticles, updateArticlesAuthorBox} = require('../modules/event/ourArticles/ourArticles');


router.put('/news', authUser,uploadEventNews ,updateExistingNews)
router.get('/news' ,getAllNews)
router.post('/news', authUser,uploadEventNews ,createNews)
router.delete('/news',authUser,deleteNews)
router.put('/news/authorBox',authUser,uploadEventNews,updateNewsAuthorBox)


router.get('/newsPageHeading', getEventNewsPageHeading)
router.put('/newsPageImage',authUser,uploadEventNews, updateEventNewsPageImage)
router.put('/newsPageHeader', authUser,updateEventNewsPageHeader)
router.post('/newsPageHeader', authUser,postEventNewsPageHeader)
router.post('/newsPageImage', authUser,uploadEventNews ,postEventNewsPageImage)


router.put('/blogs', authUser,uploadEventBlogs ,updateExistingBlogs)
router.get('/blogs' ,getAllBlogs)
router.post('/blogs', authUser,uploadEventBlogs ,createBlogs)
router.delete('/blogs',authUser,deleteBlogs)
router.put('/blogs/authorBox',authUser,uploadEventNews,updateBlogsAuthorBox)

router.get('/blogsPageHeading', getEventBlogsPageHeading)
router.put('/blogsPageImage',authUser,uploadEventBlogs, updateEventBlogsPageImage)
router.put('/blogsPageHeader',authUser,updateEventBlogsPageHeader)
router.post('/blogsPageHeader',authUser, postEventBlogsPageHeader)
router.post('/blogsPageImage', authUser,uploadEventBlogs ,postEventBlogsPageImage)



router.put('/ourArticles', authUser,uploadEventOurArticles ,updateExistingOurArticles)
router.get('/ourArticles' ,getAllOurArticles)
router.post('/ourArticles',authUser, uploadEventOurArticles ,createOurArticles)
router.delete('/ourArticles',authUser,deleteOurArticles)
router.put('/ourArticles/authorBox',authUser,uploadEventNews,updateArticlesAuthorBox)


router.get('/ourArticlesPageHeading', getEventOurArticlesPageHeading)
router.put('/ourArticlesPageImage',authUser,uploadEventOurArticles, updateEventOurArticlesPageImage)
router.put('/ourArticlesPageHeader',authUser,updateEventOurArticlesPageHeader)
router.post('/ourArticlesPageHeader',authUser, postEventOurArticlesPageHeader)
router.post('/ourArticlesPageImage',authUser, uploadEventOurArticles ,postEventOurArticlesPageImage)

module.exports=router;