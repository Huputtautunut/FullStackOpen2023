const router = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');
const User = require('../models/user');
const userExtractor = require('../utils/middleware').userExtractor;

// Get comments for a blog post
router.get('/:blogId', async (request, response) => {
  const { blogId } = request.params;
  const comments = await Comment.find({ blog: blogId }).populate('user', { username: 1, name: 1 });
  response.json(comments);
});

// Post a new comment
router.post('/:blogId', userExtractor, async (request, response) => {
  const { blogId } = request.params;
  const { text } = request.body;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  const comment = new Comment({
    text,
    blog: blogId,
    user: request.user._id,
  });

  const savedComment = await comment.save();
  response.status(201).json(savedComment);
});

// Delete a comment
router.delete('/:commentId', userExtractor, async (request, response) => {
  const { commentId } = request.params;
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return response.status(404).json({ error: 'Comment not found' });
  }

  if (comment.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'Not authorized' });
  }

  await Comment.findByIdAndRemove(commentId);
  response.status(204).end();
});

module.exports = router;
