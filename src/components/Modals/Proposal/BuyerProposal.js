import React, { useRef } from 'react';
import { Modal, useToaster } from 'rsuite';
import API from '../../../api/server';
import {
  titleValidate,
  amountValidate,
  descriptionValidate
} from '../../../helpers/proposal-validators';
import Toaster from '../../Common/Toaster';

/*
This React component represents the Buyer Proposal for an on-demand auction.
It handles the presentation and functionality related to proposing an artist for requested auction.
*/
export default function BuyerProposal({ isOpen, setIsOpen }) {
  const title = useRef();
  const amount = useRef();
  const description = useRef();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const toaster = useToaster();

  //API call for creating a new on demand proposal
  const createProposal = async () => {
    try {
      const res = await API.post(
        '/api/users/proposal/create',
        {
          title: title.current.value,
          description: description.current.value,
          expectedAmount: parseFloat(amount.current.value)
        },
        {
          headers: {
            token: 'Bearer ' + auth.token
          }
        }
      );
      if (res.data) {
        Toaster(toaster, 'success', 'Proposal created successfully!');
        setIsOpen(false);
      }
    } catch (error) {
      Toaster(toaster, 'error', 'Failed to create a proposal!');
    }
  };

  //API call for sending a proposal to artist for ondemand artwork
  const sendProposal = (e) => {
    if (
      titleValidate(title.current.value) &&
      descriptionValidate(description.current.value) &&
      amountValidate(amount.current.value)
    ) {
      e.preventDefault();
      createProposal();
    } else {
      !titleValidate(title.current.value)
        ? title.current.setCustomValidity(
            'Title must contain only alphabets and length should be greater than or equal to 10'
          )
        : title.current.setCustomValidity('');
      !amountValidate(amount.current.value)
        ? amount.current.setCustomValidity('Invalid amount!')
        : amount.current.setCustomValidity('');
      !descriptionValidate(description.current.value)
        ? description.current.setCustomValidity(
            'Invalid Description. Atleast 10 characters are expected!'
          )
        : description.current.setCustomValidity('');
    }
  };
  return (
    <Modal size={'sm'} open={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header>
        <Modal.Title>
          <p className="font-bold text-xl w-full text-center uppercase">Buyer Proposal</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="w-full ">
          <div className="flex flex-wrap mb-2">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="title">
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                id="title"
                type="text"
                ref={title}
              />
            </div>
          </div>
          <div className="flex flex-wrap  mb-2">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-amount">
                Expected Amount
              </label>
              <input
                id="grid-amount"
                min={0}
                ref={amount}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-wrap  mb-2">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-desc">
                Description
              </label>
              <textarea
                ref={description}
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary h-48 resize-none"
                id="grid-desc"></textarea>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              onClick={sendProposal}
              className="uppercase shadow w-1/3 bg-primary hover:bg-cyan-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              Send Proposal
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
