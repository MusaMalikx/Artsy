import React from 'react';
import { Modal } from 'rsuite';

export default function AutomateBid({ open, setOpen }) {
  const handleClose = () => setOpen(false);
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
              Current Highest Bid <span className="text-lg text-red-500">$51</span>
            </p>
            <p className="text-base font-bold">
              Your Bid <span className="text-lg text-green-500">$0</span>
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} action="#" className="flex flex-col">
            <label className="text-base font-bold py-2" htmlFor="max-bid">
              Max Amount
            </label>
            <input
              className="rounded border focus:ring-0 focus:border-primary focus:border-2 "
              type="number"
              min={1}
              name="max-bid"
            />
            <label className="text-base font-bold py-2" htmlFor="increment">
              Increments
            </label>
            <input
              className="rounded border focus:ring-0 focus:border-primary focus:border-2"
              type="number"
              min={1}
              name="increment"
            />
            <div className="text-center">
              <button className="focus:outline-none mt-4 border w-1/4 py-2 rounded-lg bg-primary active:bg-cyan-800 text-base font-bold text-white">
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
