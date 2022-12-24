import * as React from 'react';
import { MdOutlineCreate } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { useToaster } from 'rsuite';
import Toaster from '../Common/Toaster';
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null }
];

const ProposalAcceptedTable = () => {
  return (
    <div className="sm:px-6 w-full">
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="w-full text-right">
          <button className="bg-red-500 text-white font-bold px-4 py-2 rounded uppercase active:bg-red-700 focus:outline-none ">
            Delete
          </button>
        </div>
        <div className="mt-7 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <th className="focus:outline-none h-16 rounded flex w-full p-5 justify-between uppercase text-left ">
                <td className="">Select</td>
                <td className="mr-16">Title</td>
                <td className="mr-16">Date Created</td>
                <td className="mr-28">Total Bids</td>
                <td className="">Action</td>
              </th>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <ProposalTableItem key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProposalTableItem = () => {
  const toaster = useToaster();
  const checkPayment = (e) => {
    e.preventDefault();
    Toaster(toaster, 'success', 'Payment sent to Artist');
  };
  return (
    <tr
      tabIndex="0"
      className="focus:outline-none h-16 border my-2 border-gray-100 rounded flex w-full justify-between p-5 hover:scale-95 transition-all ">
      <td className="">
        <div className="bg-gray-200 rounded-sm w-5  h-5 flex flex-shrink-0 justify-center items-center relative">
          <input
            placeholder="checkbox"
            type="checkbox"
            className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer"
          />
        </div>
      </td>
      <td className="">
        <p className="text-base font-medium text-gray-700">Ocean Potrait</p>
      </td>
      <td className="flex items-center">
        <MdOutlineCreate />
        <p className="text-sm leading-none text-gray-600 ml-2">2nd December, 2022</p>
      </td>
      <td className="flex items-center">
        {<FaUserEdit />}
        <p className="text-sm leading-none text-gray-600 ml-2">Eva Jennesen</p>
      </td>
      <td className="flex items-center">
        <button
          onClick={checkPayment}
          className="text-sm text-white leading-none  py-3 px-5 bg-primary rounded active:bg-cyan-700 primary focus:outline-none">
          Release Payment
        </button>
      </td>
    </tr>
  );
};

export default ProposalAcceptedTable;
