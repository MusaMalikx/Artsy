import * as React from 'react';
import { BsChatLeftDots } from 'react-icons/bs';
import { MdOutlineCreate } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null }
];

const ProposalTable = () => {
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
              <th className="focus:outline-none h-16 rounded flex w-full p-5 uppercase text-left ">
                <td className="w-3/12">Select</td>
                <td className="w-3/12">Title</td>
                <td className="w-3/12 pl-5">Date Created</td>
                <td className="w-3/12 pl-7">Total Bids</td>
                <td className="pr-2">Action</td>
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
  const navigate = useNavigate();
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
        <p className="text-base font-medium text-gray-700">Looking for a Ocean Potrait</p>
      </td>
      <td className="flex items-center">
        <MdOutlineCreate />
        <p className="text-sm leading-none text-gray-600 ml-2">2nd December, 2022</p>
      </td>
      <td className="flex items-center">
        {<BsChatLeftDots />}
        <p className="text-sm leading-none text-gray-600 ml-2">23 Bids</p>
      </td>
      <td className="flex items-center">
        <button
          onClick={() => navigate('/view/artist/proposal')}
          className="text-sm text-white leading-none  py-3 px-5 bg-primary rounded active:bg-cyan-700 primary focus:outline-none">
          View
        </button>
      </td>
    </tr>
  );
};

export default ProposalTable;
