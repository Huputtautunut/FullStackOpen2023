const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./app'); // Adjust path to your Express app
const Blog = require('./models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
});

describe('Blog API', () => {
  test('creating a new blog post', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://example.com/test',
      likes: 10
    };

    // Send POST request to create a new blog post
    const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

    // Check if the total number of blogs in the system is increased by one
    const blogs = await Blog.find({});
    expect(blogs).toHaveLength(1);

    // Verify the content of the blog post saved in the database
    const savedBlog = blogs[0];
    expect(savedBlog.title).toBe(newBlog.title);
    expect(savedBlog.author).toBe(newBlog.author);
    expect(savedBlog.url).toBe(newBlog.url);
    expect(savedBlog.likes).toBe(newBlog.likes);
  });

  test('unique identifier is id, not _id', async () => {
    const newBlog = {
      title: 'Unique Identifier Test',
      author: 'Test Author',
      url: 'https://example.com/unique',
      likes: 5
    };

    // Create a new blog post
    const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

    // Check if the returned blog post has id instead of _id
    expect(response.body).toHaveProperty('id');
    expect(response.body._id).toBeUndefined();
  });
});
