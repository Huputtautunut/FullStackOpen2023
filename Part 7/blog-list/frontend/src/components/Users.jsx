import React from 'react';
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
      <Notification notification={null} /> {/* You can use this if you want to add notifications */}
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
              <td>{user.username}</td>
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