import { useQuery, useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';

export const useComments = (blogId) => {
  return useQuery(['comments', blogId], () => blogService.getComments(blogId));
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ blogId, comment }) => blogService.addComment(blogId, comment),
    {
      onSuccess: (_, { blogId }) => {
        queryClient.invalidateQueries(['comments', blogId]);
      },
    }
  );
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (commentId) => blogService.deleteComment(commentId),
    {
      onSuccess: (_, commentId) => {
        // Assuming you have the blogId in context or state
        queryClient.invalidateQueries(['comments']);
      },
    }
  );
};