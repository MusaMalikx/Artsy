import React from 'react';
import { Modal } from 'rsuite';
import ReviewDescription from './Description/ReviewDescription';
export default function BuyerReview({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  return (
    <Modal onClose={handleClose} size="sm" open={open}>
      <Modal.Header>
        <Modal.Title>
          <p className="text-lg font-bold">Reviews</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReviewDescription />
        <ReviewDescription />
        <ReviewDescription />
        <ReviewDescription />
        <ReviewDescription />
        <ReviewDescription />
        <ReviewDescription />
        <ReviewDescription />
        <ReviewDescription />
      </Modal.Body>
    </Modal>
  );
}
