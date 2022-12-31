import React, { useState } from 'react';
import { SlCalender } from 'react-icons/sl';
import { FaUserShield, FaUserSlash } from 'react-icons/fa';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import AdminLayout from '../../components/Layouts/AdminLayout';
import ReportDetail from '../../components/Modals/ReportDetail';
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null }
];

const Reports = () => {
  return (
    <AdminLayout title="Reports">
      <HeaderLayout title="Users Report" />
      <div>
        <ReportTable />
      </div>
    </AdminLayout>
  );
};

const ReportTable = () => {
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
                <td className="max-w-xs w-full text-center pl-12">From</td>
                <td className="max-w-xs w-full text-center  pr-10">To</td>
                <td className="max-w-xs w-full text-left pl-12">Date</td>
                <td className="">Action</td>
              </th>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <ReportItem key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ReportItem = () => {
  const [openReport, setOpenReport] = useState(false);
  const viewReportDetail = (e) => {
    e.preventDefault();
    setOpenReport(true);
  };
  return (
    <tr
      tabIndex="0"
      className="focus:outline-none h-16 border my-2 border-gray-100 rounded flex w-full justify-between hover:bg-slate-100 p-5 hover:scale-95 transition-all ">
      <td className="">
        <div className="bg-gray-200 rounded-sm w-5  h-5 flex flex-shrink-0 justify-center items-center relative">
          <input
            placeholder="checkbox"
            type="checkbox"
            className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer"
          />
        </div>
      </td>
      <td className="flex items-center">
        <FaUserShield />
        <p className="text-base font-medium text-gray-700 ml-2">Muhammad Ahmed</p>
      </td>
      <td className="flex items-center">
        {<FaUserSlash />}
        <p className="text-sm leading-none text-gray-600 ml-2">Musa Malik</p>
      </td>
      <td className="flex items-center">
        <SlCalender />
        <p className="text-sm leading-none text-gray-600 ml-2">14 December, 2022</p>
      </td>
      <td className="flex items-center">
        <button
          onClick={viewReportDetail}
          className="text-sm text-white leading-none  py-3 px-5 bg-primary rounded active:bg-cyan-700 primary focus:outline-none">
          View
        </button>
      </td>
      {<ReportDetail open={openReport} setOpen={setOpenReport} />}
    </tr>
  );
};

export default Reports;
