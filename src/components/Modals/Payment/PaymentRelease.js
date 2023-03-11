import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Lottie from 'react-lottie-player';
import { Modal, useToaster } from 'rsuite';
import API from '../../../api/server';
import lottie from '../../../assets/json/payment-processing.json';
import Toaster from '../../Common/Toaster';

const PaymentRelease = ({ open, setOpen, setGiveReview, artwork, updateList }) => {
  const handleClose = () => setOpen(false);
  const auth = JSON.parse(localStorage.getItem('auth'));
  const toaster = useToaster();

  const releasePayment = async () => {
    try {
      const res = await API.get(`/api/users/payment/release/artwork/${artwork._id}`, {
        headers: {
          token: 'Bearer ' + auth.token
        }
      });
      if (res.status === 200) {
        updateList();
        setGiveReview();
        Toaster(toaster, 'success', 'Payment released succesfully!');
      }
    } catch (error) {
      Toaster(toaster, 'error', 'Failed to release Payment!');
    }
  };

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
        onClick={() => {
          releasePayment();
        }}>
        Release Payment
      </button>
    </Modal>
  );
};

export default PaymentRelease;
