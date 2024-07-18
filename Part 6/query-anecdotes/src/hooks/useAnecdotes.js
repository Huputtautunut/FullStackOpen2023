import { useQuery } from 'react-query'
import axios from 'axios'

const fetchAnecdotes = async () => {
  const { data } = await axios.get('http://localhost:3001/anecdotes')
  return data
}

const useAnecdotes = () => {
  return useQuery('anecdotes', fetchAnecdotes)
}

export default useAnecdotes