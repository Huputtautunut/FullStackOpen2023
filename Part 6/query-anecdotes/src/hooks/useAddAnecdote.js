import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const addAnecdote = async (newAnecdote) => {
  const { data } = await axios.post('http://localhost:3001/anecdotes', newAnecdote)
  return data
}

const useAddAnecdote = () => {
  const queryClient = useQueryClient()

  return useMutation(addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
}

export default useAddAnecdote