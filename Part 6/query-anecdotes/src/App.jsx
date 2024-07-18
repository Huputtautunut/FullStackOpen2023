import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import useAnecdotes from './hooks/useAnecdotes'
import useVoteAnecdote from './hooks/useVoteAnecdote'
import { useNotification } from './notificationContext'

const App = () => {
  const { data: anecdotes, error, isLoading } = useAnecdotes()
  const { mutate: voteAnecdote } = useVoteAnecdote()
  const { dispatch } = useNotification()

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote, {
      onSuccess: () => {
        dispatch({ type: 'SET_NOTIFICATION', payload: `You voted for '${anecdote.content}'` })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
      }
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching anecdotes. Please try again later.</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App