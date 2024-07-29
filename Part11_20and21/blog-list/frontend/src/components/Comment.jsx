import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment, onDelete }) => {
  return (
    <div>
      <p>{comment.text}</p>
      <button onClick={() => onDelete(comment.id)}>Delete</button>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Comment;