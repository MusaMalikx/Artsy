import React, { useState } from 'react';
import { Modal, Rate, useToaster } from 'rsuite';
import API from '../../../api/server';
import Toaster from '../../Common/Toaster';

/*
Component for adding a review on artwork. Allows users to provide their feedback and comments on a specific artwork after winning an artwork.
Provides a user-friendly interface for inputting review details and submitting them for further processing.
*/
const GiveReview = ({ open, setOpen, artwork }) => {
  const [message, setMessage] = useState('');
  const auth = JSON.parse(localStorage.getItem('auth'));
  const toaster = useToaster();
  const [hoverValue, setHoverValue] = useState(3);

  const texts = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent'
  };

  const handleClose = () => setOpen(false);

  //API call for adding a new review
  const giveRating = async () => {
    if (message.length > 0) {
      try {
        const res = await API.post(
          `/api/users/rate/artist/${artwork.artistId}`,
          {
            ratedValue: hoverValue,
            description: message
          },
          {
            headers: {
              token: 'Bearer ' + auth.token
            }
          }
        );
        if (res.status === 200) {
          handleClose();
          Toaster(toaster, 'success', 'Rating Succesfully Placed!');
        }
      } catch (error) {
        Toaster(toaster, 'error', 'Failed To Give Rating!');
      }
    } else {
      Toaster(toaster, 'error', 'Invalid Description!');
    }
  };

  return (
    <Modal onClose={handleClose} size="sm" open={open}>
      <div>
        <div className="py-3 sm:max-w-xl sm:mx-auto">
          <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
            <div className="px-12 py-5">
              <h2 className="text-gray-800 text-3xl font-semibold text-center tracking-wider">
                Your opinion matters to us!
              </h2>
            </div>
            <div className="bg-gray-200 w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-6 space-y-3">
                <span className="text-lg text-gray-800">
                  How was your experience with the Artist?
                </span>
                <Rate defaultValue={3} onChangeActive={setHoverValue} />{' '}
                <span className="font-semibold tracking-wider">{texts[hoverValue]}</span>
              </div>
              <div className="w-3/4 flex flex-col">
                <textarea
                  rows="4"
                  className="p-4 text-gray-500 rounded-xl resize-none hide"
                  placeholder=" Leave a message, if you want"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={giveRating}
                  className="py-2 my-8 mx-2 rounded text-white bg-primary border border-primary hide">
                  Rate now
                </button>
              </div>
            </div>
            <div className="h-20 flex items-center justify-center">
              <p
                className="text-gray-600 hover:underline-offset-2 hover:underline cursor-pointer"
                onClick={handleClose}>
                Not Now
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GiveReview;
