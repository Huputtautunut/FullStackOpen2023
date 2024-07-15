import React, { useState } from 'react'

const NewBlogForm = ({ handleAddBlog }) => {
  const [showForm, setShowForm] = useState(false)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleAddBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
    setShowForm(false) // Hide the form after blog is added
  }

  if (!showForm) {
    return (
      <div>
        <button onClick={() => setShowForm(true)}>Create New Blog</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input type="text" name="title" value={newBlog.title} onChange={handleInputChange} />
        </div>
        <div>
          Author: <input type="text" name="author" value={newBlog.author} onChange={handleInputChange} />
        </div>
        <div>
          URL: <input type="text" name="url" value={newBlog.url} onChange={handleInputChange} />
        </div>
        <button type="submit">Create</button>
      </form>
      <button onClick={() => setShowForm(false)}>Cancel</button>
    </div>
  )
}

export default NewBlogForm
