const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const userExtractor = require('../utils/middleware').userExtractor;

router.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

router.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body);
  const user = request.user;

  if (!user) {
    return response.status(403).json({ error: 'User missing' });
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'Title or URL missing' });
  }

  blog.likes = blog.likes || 0;
  blog.user = user;
  user.blogs = user.blogs.concat(blog._id);

  try {
    await user.save();
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(500).json({ error: 'Failed to save blog' });
  }
});

router.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;

  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(204).end();
    }

    if (user.id.toString() !== blog.user.toString()) {
      return response.status(403).json({ error: 'User not authorized' });
    }

    await blog.deleteOne();
    user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString());
    await user.save();
    response.status(204).end();
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete blog' });
  }
});

router.put('/:id', async (request, response) => {
  const { likes } = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $inc: { likes: likes } }, // Increment likes by the value provided in request.body.likes
      { new: true }
    );

    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    response.json(updatedBlog);
  } catch (error) {
    response.status(400).json({ error: 'Failed to update likes' });
  }
});

module.exports = router;
