import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setNotification({ message: 'Login successful!', type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.error('Invalid credentials', exception)
      setNotification({ message: 'Wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setNotification({ message: 'Logged out successfully!', type: 'success' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleAddBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs([...blogs, createdBlog])
      setNotification({ message: 'New blog has been added!', type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      console.error('Error adding blog:', error)
      setNotification({ message: 'Failed to add new blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification ? notification.message : null} type={notification ? notification.type : null} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <NewBlogForm setBlogs={setBlogs} blogs={blogs} handleAddBlog={handleAddBlog} />
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
