import React, { useRef } from 'react';
import { Modal } from 'rsuite';
import {
  titleValidate,
  amountValidate,
  descriptionValidate
} from '../../utils/Validors/ProposalValidators';
export default function ArtistProposal({ isOpen, setIsOpen }) {
  const title = useRef();
  const amount = useRef();
  const description = useRef();

  const sendProposal = (e) => {
    if (
      titleValidate(title.current.value) &&
      descriptionValidate(description.current.value) &&
      amountValidate(amount.current.value)
    ) {
      e.preventDefault();

      ///Write Axios API code Here

      setIsOpen(false);
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
          <p className="font-bold text-xl w-full text-center uppercase">Artist Proposal</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="w-full ">
          <div className="flex flex-wrap mb-2">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-title">
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                id="rid-title"
                type="text"
                ref={title}
              />
            </div>
          </div>
          <div className="flex flex-wrap  mb-2">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="amount">
                Bid Amount
              </label>
              <input
                min={0}
                id="amount"
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
              className="uppercase shadow w-1/3 bg-primary hover:bg-cyan-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit">
              Place bid
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
