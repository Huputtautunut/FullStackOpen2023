import React, { useState } from 'react';
import { useComments, useAddComment, useDeleteComment } from '../hooks/useComments';
import Comment from './Comment';

const CommentsSection = ({ blogId }) => {
  const { data: comments = [], isLoading, error } = useComments(blogId);
  const addCommentMutation = useAddComment();
  const deleteCommentMutation = useDeleteComment();

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    addCommentMutation.mutate({ blogId, comment: { text: newComment } });
    setNewComment('');
  };

  const handleDeleteComment = (commentId) => {
    deleteCommentMutation.mutate(commentId);
  };

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments</div>;

  return (
    <div>
      <h3>Comments</h3>
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onDelete={handleDeleteComment} />
        ))}
      </div>
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default CommentsSection;