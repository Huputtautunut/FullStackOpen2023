// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  const { username, name, password } = req.body;

  if (!password || password.length < 3) {
    return res.status(400).json({
      error: 'Password is required and must be at least 3 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
