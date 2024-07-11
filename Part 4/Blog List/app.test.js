const request = require('supertest');
const app = require('./app'); // Your Express app instance
const Blog = require('./models/blog');

describe('Blog API', () => {
  beforeEach(async () => {
    // Clear the database or set up initial state before each test
    await Blog.deleteMany({});
  });

  test('Updating a blog post', async () => {
    // Create a blog post to update
    const newBlog = await Blog.create({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10,
    });

    const updatedData = {
      title: 'Updated Blog',
      author: 'Updated Author',
      url: 'http://updated.com',
      likes: 15,
    };

    // Make a PUT request to update the blog post
    const response = await request(app)
      .put(`/api/blogs/${newBlog._id}`)
      .send(updatedData)
      .expect(200);

    // Verify the response
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.author).toBe(updatedData.author);
    expect(response.body.url).toBe(updatedData.url);
    expect(response.body.likes).toBe(updatedData.likes);
  });
});
