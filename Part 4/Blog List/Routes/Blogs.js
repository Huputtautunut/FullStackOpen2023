const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController.js');

router.get('/', blogController.getAllBlogs);
router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog); // Route for updating a blog
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
