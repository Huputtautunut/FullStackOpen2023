
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';
import Notification from './Notification';
import CommentsSection from './CommentsSection';

const BlogDetails = () => {
  const { id } = useParams();
  const { data: isLoading, error } = useBlogs(id);
  const [blog, setBlog] = useState(null);
  const [notification, setNotification] = useState(null);

  if (isLoading) return <div>Loading blog...</div>;
  if (error) return <div>Error loading blog</div>;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await blogService.getById(id);
        setBlog(blogData);
      } catch (error) {
        setNotification('Error fetching blog details');
        setTimeout(() => setNotification(null), 5000);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <Notification notification={notification} />
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}
        {/* You can add buttons for like and delete here if needed */}
      </div>
      <div>added by {blog.user ? blog.user.name : 'anonymous'}</div>
      <CommentsSection blogId={id} />
    </div>
  );
};

export default BlogDetails;