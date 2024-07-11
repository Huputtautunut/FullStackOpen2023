const Blog = require('../models/blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, author, url, likes } = req.body;
    const newBlog = new Blog({ title, author, url, likes });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }

  exports.deleteBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const deletedBlog = await Blog.findByIdAndDelete(blogId);
  
      if (!deletedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      res.status(204).end(); // No content response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};
