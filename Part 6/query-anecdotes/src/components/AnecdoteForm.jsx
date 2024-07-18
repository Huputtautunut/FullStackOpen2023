import React from 'react'
import useAddAnecdote from '../hooks/useAddAnecdote'
import { useNotification } from '../notificationContext'

const AnecdoteForm = () => {
  const { mutate } = useAddAnecdote()
  const { dispatch } = useNotification()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length >= 5) {
      mutate({ content, votes: 0 }, {
        onSuccess: () => {
          dispatch({ type: 'SET_NOTIFICATION', payload: `Anecdote '${content}' created` })
          setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
          }, 5000)
        }
      })
      event.target.anecdote.value = ''
    } else {
      alert('Anecdote must be at least 5 characters long')
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm