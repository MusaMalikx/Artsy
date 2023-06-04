import React, { useRef, useState } from 'react';
import { Modal, useToaster } from 'rsuite';
import API from '../../api/server';
import Toaster from '../Common/Toaster';

/*
This component implements an automated bid pop-up feature that allows buyers to generate bids even when they are offline. 
It provides a seamless experience by enabling bid generation and storage, ensuring a smooth bidding process for users.
*/
export default function AutomateBid({ open, setOpen, bidInfo, setBidInfo, artId }) {
  const handleClose = () => setOpen(false);
  const maxAmount = useRef();
  const increment = useRef();
  const toaster = useToaster();
  const [auth] = useState(JSON.parse(localStorage.getItem('auth')));
  const placeAutomatedBid = async (e) => {
    const basePrice = parseFloat(bidInfo.basePrice);
    const currentBid = parseFloat(bidInfo.currentBid);
    const inputMaxAmount = parseFloat(maxAmount.current.value);
    const inputIncrement = parseFloat(increment.current.value);

    if (inputMaxAmount > 0 && inputIncrement > 0) {
      if (
        (currentBid > basePrice && inputMaxAmount >= currentBid + inputIncrement) ||
        (currentBid < basePrice && basePrice + inputIncrement <= inputMaxAmount)
      ) {
        e.preventDefault();
        try {
          const res = await API.post(
            `/api/users/autobid/${artId}`,
            {
              maxAmount: inputMaxAmount,
              increment: inputIncrement
            },
            {
              headers: {
                token: 'Bearer ' + auth.token
              }
            }
          );

          if (res) {
            setBidInfo();
            Toaster(toaster, 'success', 'Succesfully placed an automated bid!');
          }
        } catch (error) {
          Toaster(toaster, 'error', 'Failed to place automated bid!');
        }
      } else {
        maxAmount.current.setCustomValidity('Invalid Max Bid! Increase Max Bid!');
      }
    } else {
      if (maxAmount.current.value === '' || maxAmount.current.value === 0)
        maxAmount.current.setCustomValidity('Enter a valid amount!');
      else increment.current.setCustomValidity('Enter a valid amount!');
    }
  };
  return (
    <Modal onClose={handleClose} size="sm" open={open}>
      <Modal.Header>
        <Modal.Title>
          <p className="text-lg font-bold">Automated Bid</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="flex justify-between items-center">
            <p className="text-base font-bold">
              Current Highest Bid{' '}
              <span className="text-lg text-red-500">PKR {bidInfo.currentBid}</span>
            </p>
            <p className="text-base font-bold">
              Your Previous Bid{' '}
              <span className="text-lg text-green-500">PKR {bidInfo.buyerInfo.bid}</span>
            </p>
          </div>
          <form action="#" className="flex flex-col">
            <label className="text-base font-bold py-2" htmlFor="max-bid">
              Max Amount
            </label>
            <input
              className="rounded border focus:ring-0 focus:border-primary focus:border-2 "
              type="number"
              min={1}
              ref={maxAmount}
              name="max-bid"
            />
            <label className="text-base font-bold py-2" htmlFor="increment">
              Increment
            </label>
            <input
              className="rounded border focus:ring-0 focus:border-primary focus:border-2"
              type="number"
              ref={increment}
              min={1}
              name="increment"
            />
            <div className="text-center">
              <button
                onClick={placeAutomatedBid}
                className="focus:outline-none mt-4 border w-1/4 py-2 rounded-lg bg-primary active:bg-cyan-800 text-base font-bold text-white">
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
