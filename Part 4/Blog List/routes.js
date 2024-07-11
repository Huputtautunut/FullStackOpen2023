const express = require('express');
const router = express.Router();
const blogController = require('./controllers/blogController');
const blogsRouter = require('./Routes/Blogs');


router.get('/', blogController.getAllBlogs);
router.post('/', blogController.createBlog);

router.use('/api/blogs', blogsRouter);

module.exports = router;
