import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationMenu = ({ user, handleLogout }) => {
  return (
    <nav>
      <NavLink to="/" end style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
        Home
      </NavLink>
      <span> | </span>
      <NavLink to="/users" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
        Users
      </NavLink>
      <span> | </span>
      {user ? (
        <>
          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
        </>
      ) : (
        <NavLink to="/login" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default NavigationMenu;