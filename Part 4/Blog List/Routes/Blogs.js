const express = require('express');
const router = express.Router();
const verifyToken = require('../controllers/login');
const blogController = require('../controllers/blogController');

router.post('/', verifyToken, blogController.createBlog);

module.exports = router;