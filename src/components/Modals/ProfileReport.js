import React from 'react';
import { Checkbox, Modal } from 'rsuite';
import { AiFillFlag } from 'react-icons/ai';
import { useToaster } from 'rsuite';
import Toaster from '../Common/Toaster';
export default function ProfileReport({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const toaster = useToaster();
  const submitReport = (e) => {
    e.preventDefault();
    Toaster(toaster, 'success', 'Successfully Reported');
  };
  return (
    <Modal onClose={handleClose} size="sm" open={open}>
      <Modal.Header>
        <Modal.Title>
          <p className="text-lg font-bold flex justify-center items-center gap-2 text-red-500">
            {' '}
            <AiFillFlag />
            Report
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-lg font-bold mb-3">What went wrong?</p>
        <form action="#">
          <div className="flex flex-col w-full">
            <div className="flex ">
              <Checkbox className="w-1/2"> Fake Profile</Checkbox>
              <Checkbox className="w-1/2"> Scam</Checkbox>
              <Checkbox className="w-1/2"> Inappropriate Behaviour</Checkbox>
            </div>
            <div className="flex ">
              <Checkbox className="w-1/2"> Hateful Content</Checkbox>
              <Checkbox className="w-1/2"> Misleading</Checkbox>
              <Checkbox className="w-1/2"> Spam Messages</Checkbox>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <label className="text-base font-bold" htmlFor="report-desc">
              Description
            </label>
            <textarea
              name="report-desc"
              className="h-40 rounded-lg bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"></textarea>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={submitReport}
              className="bg-primary active:bg-cyan-800 py-1 px-3 rounded focus:outline-none text-white font-bold text-base">
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
