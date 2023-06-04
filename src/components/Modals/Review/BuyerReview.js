import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal } from 'rsuite';
import API from '../../../api/server';
import EmptyRating from '../../Animation/EmptyRating';
import ReviewDescription from '../Description/ReviewDescription';

/*
This React component displays the detailed buyer review for an artwork. 
It provides valuable insights and feedback from buyers, helping to inform potential customers about the quality and satisfaction level of the artwork. 
By incorporating this component into the application, users can make more informed decisions based on the buyer reviews.
*/
export default function BuyerReview({ open, setOpen, artistId }) {
  const handleClose = () => setOpen(false);
  const [ratingList, setRatingList] = useState([]);
  const fetchAllReviews = async () => {
    const res = await API.get(`/api/artists/rating/${artistId}`);
    if (res.status === 200) setRatingList(res.data);
  };
  useEffect(() => {
    fetchAllReviews();
  }, []);

  return (
    <Modal onClose={handleClose} size="sm" open={open}>
      <Modal.Header>
        <Modal.Title>
          <p className="text-lg font-bold">Reviews</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ratingList.length > 0 ? (
          ratingList.map((rat) => {
            return <ReviewDescription rating={rat} key={Math.random().toString(16).slice(2)} />;
          })
        ) : (
          <EmptyRating />
        )}
      </Modal.Body>
    </Modal>
  );
}
