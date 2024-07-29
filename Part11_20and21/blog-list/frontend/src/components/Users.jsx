import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import userService from '../services/users';
import Notification from './Notification';

const Users = () => {
  const { data: users = [], isLoading, error } = useQuery('users', userService.getAll);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      <Notification notification={null} />
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;