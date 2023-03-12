import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Modal, useToaster } from 'rsuite';
import API from '../../../api/server';
import {
  titleValidate,
  amountValidate,
  descriptionValidate
} from '../../../helpers/proposal-validators';
import Toaster from '../../Common/Toaster';

export default function ArtistProposal({
  isOpen,
  setIsOpen,
  proposalId,
  updateProposalList,
  isBidPlaced
}) {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const toaster = useToaster();
  const title = useRef();
  const amount = useRef();
  const description = useRef();

  //these are used when bid was already placed
  const [titlePlaced, setTitlePlaced] = useState('');
  const [amountPlaced, setAmountPlaced] = useState(0);
  const [descriptionPlaced, setDescriptionPlaced] = useState('');

  useEffect(() => {
    if (isBidPlaced == true) {
      proposalId.artistProposals.forEach((artistBid) => {
        if (artistBid.artistId === auth.user._id) {
          setTitlePlaced(artistBid.title);
          setDescriptionPlaced(artistBid.description);
          setAmountPlaced(artistBid.bidAmount);
          return;
        }
      });
    }
  }, [isBidPlaced]);

  const placeBidProposal = async () => {
    try {
      const res = await API.post(
        `/api/artists/proposal/bid/${proposalId._id}`,
        {
          title: title.current.value,
          description: description.current.value,
          bidAmount: amount.current.value
        },
        {
          headers: {
            token: 'Bearer ' + auth.token
          }
        }
      );
      if (res.data) {
        updateProposalList();
        Toaster(toaster, 'success', 'Succesfully placed a bid!');
        setIsOpen(false);
      }
    } catch (error) {
      Toaster(toaster, 'error', 'Failed to place bid!');
    }
  };

  const sendProposal = (e) => {
    if (
      titleValidate(title.current.value) &&
      descriptionValidate(description.current.value) &&
      amountValidate(amount.current.value)
    ) {
      e.preventDefault();
      placeBidProposal();
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
    <>
      {isBidPlaced == false ? ( //Bid is not Placed show input form
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
      ) : (
        //Bid is already placed by artist then show his details NEED to ADD proposal status Later
        <Modal size={'sm'} open={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>
            <Modal.Title>
              <p className="font-bold text-xl w-full text-center uppercase">Your Proposal</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="w-full ">
              <div className="flex flex-wrap mb-2">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-title">
                    Title
                  </label>
                  <p>{titlePlaced}</p>
                </div>
              </div>
              <div className="flex flex-wrap  mb-2">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="amount">
                    Bid Amount
                  </label>
                  <p>{amountPlaced}</p>
                </div>
              </div>
              <div className="flex flex-wrap  mb-2">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-desc">
                    Description
                  </label>
                  <p>{descriptionPlaced}</p>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
