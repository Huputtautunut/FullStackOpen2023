import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ setBlogs, blogs }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0 // You can set default values or let the user input them
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs([...blogs, createdBlog])
      setNewBlog({ title: '', author: '', url: '', likes: 0 }) // Reset form fields
    } catch (error) {
      console.error('Error adding blog:', error)
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  )
}

export default NewBlogForm
