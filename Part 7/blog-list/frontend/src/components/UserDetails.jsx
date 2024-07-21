import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/users';
import Notification from './Notification';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getById(id);
        setUser(userData);
      } catch (error) {
        setNotification('Error fetching user details');
        setTimeout(() => setNotification(null), 5000);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <Notification notification={notification} />
      <h3>Blogs by {user.name}</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map(blog => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>{blog.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;