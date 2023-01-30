import React from 'react';
import { Dropdown, IconButton, SelectPicker } from 'rsuite';

import { FaPaintBrush } from 'react-icons/fa';
import { MdOutlineCreate, MdPayment } from 'react-icons/md';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsChatLeftDots, BsThreeDotsVertical } from 'react-icons/bs';

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

const AuctionTable = () => {
  return (
    <div className="sm:px-6 w-full">
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <SortTable />
        <div className="mt-7 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <th className="focus:outline-none h-16 rounded flex w-full p-5 justify-between uppercase text-left ">
                <td className="w-32">Title</td>
                <td className="ml-12 w-48">Date Created</td>
                <td className=" w-48">Total Bids</td>
                <td className="mr-24 w-32">Status</td>
                <td className="">Payment</td>
                <td className="">Action</td>
              </th>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <AuctionTableItem key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AuctionTableItem = () => {
  return (
    <>
      <tr
        tabIndex="0"
        className="focus:outline-none h-16 border my-2 border-gray-100 rounded flex w-full justify-between p-5 transition-all">
        <td className="flex items-center">
          <FaPaintBrush />
          <p className="text-base ml-2  capitalize font-medium text-gray-700">The art of ocean</p>
        </td>
        <td className="flex items-center w-40">
          <MdOutlineCreate />
          <p className="text-sm leading-none text-gray-600 ml-2">24/2/2021</p>
        </td>
        <td className="flex items-center w-40">
          {<BsChatLeftDots />}
          <p className="text-sm leading-none text-gray-600 ml-2">4 Bids</p>
        </td>
        <td className="flex items-center w-40">
          {<AiOutlineExclamationCircle />}
          <p className="text-sm capitalize leading-none text-gray-600 ml-2">Closed</p>
        </td>
        <td className="flex items-center">
          {<MdPayment />}
          <p className="text-sm capitalize leading-none text-gray-600 ml-2">Pending</p>
        </td>
        <td className="">
          {/* <div className="bg-gray-200 rounded-sm w-5  h-5 flex flex-shrink-0 justify-center items-center relative">
            <input
              placeholder="checkbox"
              type="checkbox"
              className=" checked:bg-primary checked:border-primary "
            />
          </div> */}
          <Drop />
        </td>
      </tr>
    </>
  );
};

const SortTable = () => {
  const data = ['All', 'Live', 'Closed'].map((item) => ({ label: item, value: item }));
  return (
    <div className="flex flex-grow justify-end">
      <SelectPicker
        cleanable={false}
        defaultValue="All"
        onChange={(value) => {
          //Make API calls based on values
          console.log(value);
        }}
        searchable={false}
        data={data}
        style={{ width: 224 }}
      />
    </div>
  );
};

const renderIconButton = (props, ref) => {
  return <IconButton {...props} ref={ref} icon={<BsThreeDotsVertical />} circle />;
};

const Drop = () => {
  return (
    <Dropdown renderToggle={renderIconButton}>
      <Dropdown.Item>View Artwork</Dropdown.Item>
      <Dropdown.Item>Edit Artwork</Dropdown.Item>
      <Dropdown.Item>Delete Artwork</Dropdown.Item>
    </Dropdown>
  );
};

export default AuctionTable;
