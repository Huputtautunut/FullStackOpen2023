import { useQuery, useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';

export const useBlogs = () => {
  return useQuery('blogs', blogService.getAll);
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
};

export const useLikeBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, updatedBlog }) => blogService.update(id, updatedBlog), {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
};
