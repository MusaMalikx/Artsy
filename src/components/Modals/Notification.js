import React from 'react';
import { Modal } from 'rsuite';
import './style/Notification.css';
import NotificationDescription from './Description/NotificationDescription';

export default function Notification({ isOpen, handleClose }) {
  return (
    <Modal
      style={{ marginLeft: '28px', marginTop: '85px' }}
      id="notification-container"
      size="xs"
      open={isOpen}
      onClose={handleClose}
      title="Notifications"
      placement="rightStart">
      <Modal.Title className="p-4 pb-0">Notifications</Modal.Title>
      <Modal.Body className=" w-full h-96 overflow-hidden overflow-y-scroll">
        <NotificationDescription />
        <NotificationDescription />
        <NotificationDescription />
        <NotificationDescription />
        <NotificationDescription />
        <NotificationDescription />
        <NotificationDescription />
      </Modal.Body>
    </Modal>
  );
}
