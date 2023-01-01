import React from 'react';
import { Modal, useToaster } from 'rsuite';
import Toaster from '../Common/Toaster';
import { GoPrimitiveDot } from 'react-icons/go';
export default function ReportDetail({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const toaster = useToaster();
  const sendWarning = (e) => {
    e.preventDefault();
    Toaster(toaster, 'warning', 'Warning sent to Musa Malik');
  };
  return (
    <Modal onClose={handleClose} size="sm" open={open}>
      <Modal.Header>
        <Modal.Title>
          <p className="text-lg font-bold">Report Detail</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div>
            <p className="text-base font-bold text-center mb-3">
              Date: <span>14 December,2022</span>
            </p>
            <div className="flex justify-between items-center">
              <p className="text-base font-bold">
                From <span className=" text-green-500">Muhammad Ahmed</span>
              </p>
              <p className="text-base font-bold">
                To <span className=" text-red-500">Musa Malik</span>
              </p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} action="#" className="flex flex-col">
            <div>
              <h2 className="text-base font-bold py-2">Reasons</h2>
              <p className="flex items-center gap-2 font-bold text-red-500">
                <GoPrimitiveDot /> Fake Profile
              </p>
              <p className="flex items-center gap-2 font-bold text-red-500">
                <GoPrimitiveDot /> Scam
              </p>
            </div>
            <label className="text-base font-bold py-2" htmlFor="report-desc">
              Description
            </label>
            <textarea
              disabled
              className="rounded border p-2 text-base focus:ring-0 focus:border-primary h-32 focus:border-2"
              name="report-desc">
              {
                '• This artist has posted multiple fake artworks.\n• This artist tried to scam me.\n Please take a strict action against the artist.'
              }
            </textarea>
            <div className="text-center">
              <button
                onClick={sendWarning}
                className="focus:outline-none mt-4 border w-1/4 py-2 rounded-lg bg-primary active:bg-cyan-800 text-base font-bold text-white">
                Send Warning
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
