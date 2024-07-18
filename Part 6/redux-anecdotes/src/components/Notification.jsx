import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification.message);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? 'block' : 'none', // Show only when there's a notification
  };

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;