import React from 'react';
import { Modal } from 'rsuite';
export default function ArtistProposal({ isOpen, setIsOpen }) {
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
                htmlFor="grid-password">
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nick"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap  mb-2">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password">
                Bid Amount
              </label>
              <input
                min={0}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-wrap  mb-2">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password">
                Description
              </label>
              <textarea
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                id="message"></textarea>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              className="uppercase shadow w-1/3 bg-primary hover:bg-cyan-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button">
              Place bid
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
