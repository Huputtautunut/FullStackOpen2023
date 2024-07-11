const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createBlog = async (req, res) => {
  const { title, author, url, likes } = req.body;
  
  // Get the token from the authorization header
  const authorization = req.get('authorization');
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authorization.substring(7);
  
  // Verify the token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
  
  // Find the user based on the decoded token
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: User not found' });
  }
  
  // Create a new blog with the user as the creator
  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  });
  
  try {
    const savedBlog = await newBlog.save();
    // Add the new blog to the user's blogs array
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

module.exports = {
  createBlog
};
