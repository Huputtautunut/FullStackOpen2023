// utils/list_helper.test.js

const { test, describe } = require('node:test'); // Replace with your testing library
const assert = require('node:assert');
const listHelper = require('./list_helper'); // Adjust path as necessary

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ];

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    }
  ];

  test('when list has only one blog, equals the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('when list has multiple blogs, equals the sum of likes of all blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 27); // 5 + 12 + 10
  });

  test('when list is empty, equals zero', () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
});
