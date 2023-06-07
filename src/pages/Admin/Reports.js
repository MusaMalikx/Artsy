import React, { useEffect, useState } from 'react';
import { SlCalender } from 'react-icons/sl';
import { FaUserShield, FaUserSlash } from 'react-icons/fa';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import AdminLayout from '../../components/Layouts/AdminLayout';
import ReportDetail from '../../components/Modals/Report/ReportDetail';
import { BsViewList } from 'react-icons/bs';
import API from '../../api/server';
import moment from 'moment';

/*
This React component is responsible for rendering the user behaviour report in the admin portal. 
It provides valuable insights and analytics on how users interact with the system, helping administrators make data-driven decisions. 
The component plays a crucial role in enhancing the overall website experience.
*/
const Reports = () => {
  return (
    <AdminLayout title="Reports" bool>
      <HeaderLayout title="Users Report" />
      <div>
        <ReportTable />
      </div>
    </AdminLayout>
  );
};

const ReportTable = () => {
  const [reports, setReports] = useState();
  useEffect(() => {
    //API call for getting user reports
    const getReports = async () => {
      try {
        const res = await API.get('/api/users/reports');
        setReports(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getReports();
  }, []);

  return (
    <div className="sm:px-6 w-full">
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="mt-7 overflow-x-auto">
          <div className="w-[80rem] overflow-x-scroll mx-auto whitespace-nowrap">
            <div>
              <div className="focus:outline-none grid grid-cols-10 h-16 rounded w-full p-5 justify-between uppercase font-bold">
                <div className="">Reporter</div>
                <div className="col-span-3">From</div>
                <div className="col-span-3">To</div>
                <div className="col-span-2">Date</div>
                <div className="">Action</div>
              </div>
            </div>
            <div>
              {reports?.map((report) => (
                <ReportItem key={report._id} report={report} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//Renders a single report item in the report table
const ReportItem = ({ report }) => {
  const [openReport, setOpenReport] = useState(false);
  const viewReportDetail = (e) => {
    e.preventDefault();
    setOpenReport(true);
  };
  return (
    <div
      tabIndex="0"
      className={`focus:outline-none items-center border my-2 border-gray-100 rounded w-full justify-between p-5 transition-all grid grid-cols-10
   `}>
      <div className="">
        <div className="bg-gray-100 w-fit text-xs font-bold px-2 py-1 rounded-sm flex flex-shrink-0 justify-center items-center relative">
          {report.reportType === 'artist' ? 'Buyer' : 'Artist'}
        </div>
      </div>
      <div className="flex items-center space-x-2 col-span-3">
        <FaUserShield />
        <p className="text-base capitalize font-medium text-gray-700">
          {report.reportType === 'artist' ? report.buyer.name : report.artist.name}
        </p>
      </div>
      <div className="flex items-center col-span-3">
        <FaUserSlash />
        <p className="text-sm leading-none text-gray-600 ml-2">
          {report.reportType === 'artist' ? report.artist.name : report.buyer.name}
        </p>
      </div>
      <div className="flex items-center col-span-2">
        <SlCalender />
        <p className="text-sm capitalize leading-none text-gray-600 ml-2">
          {moment(report.createdAt).format('MMMM Do YYYY')}
        </p>
      </div>
      <div className="flex space-x-2 items-center">
        <button
          onClick={viewReportDetail}
          className="text-lg text-white leading-none  py-1 px-2 rounded primary focus:outline-none bg-primary active:bg-cyan-700 hover:bg-cyan-700">
          <BsViewList />
        </button>
      </div>
      <ReportDetail open={openReport} setOpen={setOpenReport} report={report} />
    </div>
  );
};

export default Reports;
