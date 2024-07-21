import React, { useState, useEffect, createRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import loginService from './services/login';
import storage from './services/storage';
import Login from './components/Login';
import Blog from './components/Blog';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useBlogs, useCreateBlog, useLikeBlog, useDeleteBlog } from './hooks/useBlogs';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import BlogDetails from './components/BlogDetails';
import NavigationMenu from './components/NavigationMenu';
import './App.css';

const App = () => {
  const { data: blogs = [], isLoading, error } = useBlogs();
  const createBlogMutation = useCreateBlog();
  const likeBlogMutation = useLikeBlog();
  const deleteBlogMutation = useDeleteBlog();
  
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const blogFormRef = createRef();

  const notify = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      storage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify('Wrong credentials', 'error');
    }
  };

  const handleCreate = async (blog) => {
    try {
      await createBlogMutation.mutateAsync(blog);
      notify(`Blog created: ${blog.title}, ${blog.author}`);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      notify('Error creating blog', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      await likeBlogMutation.mutateAsync({ id: blog.id, updatedBlog });
      notify(`Liked blog: ${blog.title}`);
    } catch (error) {
      notify('Error liking blog', 'error');
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      try {
        await deleteBlogMutation.mutateAsync(blog.id);
        notify(`Deleted blog: ${blog.title}`);
      } catch (error) {
        notify('Error deleting blog', 'error');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blogs</div>;
  }

  return (
    <Router>
      <div>
        <NavigationMenu user={user} handleLogout={handleLogout} />
        <h2>blogs</h2>
        <Notification notification={notification} />
        {user ? (
          <>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <NewBlog doCreate={handleCreate} />
            </Togglable>
            <Routes>
              <Route path="/" element={
                blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    handleVote={() => handleLike(blog)}
                    handleDelete={() => handleDelete(blog)}
                  />
                ))
              } />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
            </Routes>
          </>
        ) : (
          <Login doLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
};

export default App;