import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Lottie from 'react-lottie-player';
import { Modal } from 'rsuite';
import lottie from '../../../assets/json/payment-processing.json';

const PaymentRelease = ({ open, setOpen, setGiveReview }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal onClose={handleClose} size="sm" open={open}>
      <div className="flex justify-end">
        <AiOutlineClose className="text-xl cursor-pointer" onClick={handleClose} />
      </div>
      <div className="px-12 py-5">
        <h2 className="text-gray-800 text-3xl font-semibold text-center tracking-wider">
          Release the Payment
        </h2>
      </div>
      <Lottie play animationData={lottie} loop style={{ width: '400px', margin: 'auto' }} />
      <button
        className="py-2 rounded w-full text-white bg-primary active:bg-emerald-500 border border-primary hide"
        onClick={setGiveReview}>
        Release Payment
      </button>
    </Modal>
  );
};

export default PaymentRelease;
