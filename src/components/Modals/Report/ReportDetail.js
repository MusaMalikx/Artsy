import React from 'react';
import { Modal, useToaster } from 'rsuite';
import Toaster from '../../Common/Toaster';
import { GoPrimitiveDot } from 'react-icons/go';
import moment from 'moment';

/*
This component displays the detailed information of a user report.
It provides insights and data for further analysis and action.
*/
export default function ReportDetail({ open, setOpen, report }) {
  const handleClose = () => setOpen(false);
  const toaster = useToaster();
  const sendWarning = (e) => {
    e.preventDefault();
    Toaster(toaster, 'warning', 'Warning sent to Musa Malik');
  };
  console.log(report);
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
              Date: <span> {moment(report.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </p>
            <div className="flex justify-between items-center">
              <p className="text-base font-bold">
                From{' '}
                <span className=" text-green-500">
                  {report.reportType === 'artist' ? report.artist.name : report.buyer.name}
                </span>
              </p>
              <p className="text-base font-bold">
                To{' '}
                <span className=" text-red-500">
                  {report.reportType === 'artist' ? report.buyer.name : report.artist.name}
                </span>
              </p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} action="#" className="flex flex-col">
            <div>
              <h2 className="text-base font-bold py-2">Reasons</h2>
              {report.category.map((c, i) => (
                <p key={i} className="flex items-center gap-2 font-bold text-red-500">
                  <GoPrimitiveDot /> {c}
                </p>
              ))}
            </div>
            <label className="text-base font-bold py-2" htmlFor="report-desc">
              Description
            </label>
            <textarea
              disabled
              className="rounded border p-2 text-base focus:ring-0 focus:border-primary h-32 focus:border-2 resize-none"
              name="report-desc">
              {report.description}
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
