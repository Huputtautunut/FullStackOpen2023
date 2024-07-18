import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const updateVote = async (anecdote) => {
  const { data } = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1
  })
  return data
}

const useVoteAnecdote = () => {
  const queryClient = useQueryClient()

  return useMutation(updateVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
}

export default useVoteAnecdote