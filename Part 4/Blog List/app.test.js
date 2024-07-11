// tests/app.test.js
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./app');
const User = require('./models/user');
const Blog = require('./models/blog');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
});

test('a valid user can be added', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password123'
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await User.find({});
  expect(usersAtEnd).toHaveLength(1);

  const savedUser = usersAtEnd[0];
  expect(savedUser.username).toBe(newUser.username);
  expect(savedUser.name).toBe(newUser.name);
  expect(savedUser.passwordHash).toBeDefined();
}, 10000); // Increase timeout to 10 seconds

test('a valid blog can be added', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password123'
  };

  const userResponse = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const userId = userResponse.body.id;

  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 0,
    user: userId
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  expect(blogsAtEnd).toHaveLength(1);

  const savedBlog = blogsAtEnd[0];
  expect(savedBlog.title).toBe(newBlog.title);
  expect(savedBlog.author).toBe(newBlog.author);
  expect(savedBlog.url).toBe(newBlog.url);
  expect(savedBlog.likes).toBe(newBlog.likes);
  expect(savedBlog.user.id).toBe(newBlog.user);
}, 10000); // Increase timeout to 10 seconds

afterAll(async () => {
  await mongoose.connection.close();
});
