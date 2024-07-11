// utils/list_helper.js

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes);
  const total = likes.reduce((sum, current) => sum + current, 0);
  return total;
};

module.exports = {
  
  totalLikes,
};
