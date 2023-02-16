import React, { useState } from 'react';
import { Modal, Rate } from 'rsuite';

const GiveReview = ({ open, setOpen }) => {
  const [message, setMessage] = useState(null);

  const texts = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent'
  };

  const [hoverValue, setHoverValue] = useState(3);
  const handleClose = () => setOpen(false);
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
                <span className="text-lg text-gray-800">How was the Artist?</span>
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
                <button className="py-2 my-8 mx-2 rounded text-white bg-primary border border-primary hide">
                  Rate now
                </button>
              </div>
            </div>
            <div className="h-20 flex items-center justify-center">
              <p
                className="text-gray-600 hover:underline-offset-2 hover:underline cursor-pointer"
                onClick={handleClose}>
                Maybe later
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GiveReview;
