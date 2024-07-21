// src/components/Notification.jsx

import { useNotification } from '../NotificationContext';

const Notification = () => {
  const { state: notificationState } = useNotification();

  if (!notificationState.message) {
    return null;
  }

  const { message, type } = notificationState;

  const style = {
    backgroundColor: 'lightgrey',
    margin: '10px',
    padding: '10px',
    border: '2px solid',
    borderColor: type === 'success' ? 'green' : 'red',
    borderRadius: '5px',
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
