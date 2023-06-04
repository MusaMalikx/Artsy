import React, { useEffect, useState } from 'react';
import { Loader, SelectPicker, useToaster } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { FaPaintBrush } from 'react-icons/fa';
import { MdOutlineCreate, MdPayment } from 'react-icons/md';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsChatLeftDots, BsViewList } from 'react-icons/bs';
import API from '../../api/server';
import Toaster from '../Common/Toaster';
import EmptyList from '../Animation/EmptyList';
import { RiDeleteBin6Fill } from 'react-icons/ri';

/*
Renders a table to display a list of auctions with different fields such creation date, total bids, status, payment status
*/
const AuctionTable = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [artworks, setArtworks] = useState([]);
  const [status, setStatus] = useState('All');
  const getAllArtworks = async (status) => {
    await API.get(`/api/artworks/artistlist?status=${status}`, {
      headers: {
        token: 'Bearer ' + auth.token
      }
    })
      .then((res) => {
        setArtworks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllArtworks(status);
  }, [status]);

  return (
    <div className="sm:px-6 w-full">
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <SortTable updateStatus={setStatus} />
        <div className="mt-7 overflow-x-auto">
          <div className="w-full max-w-[80rem] overflow-x-scroll mx-auto whitespace-nowrap">
            <div>
              <div className="focus:outline-none font-bold grid grid-cols-7 rounded w-full p-5 justify-between uppercase text-left ">
                <div className="col-span-2">Title</div>
                <div className="">Date Created</div>
                <div className="">Total Bids</div>
                <div className="">Status</div>
                <div className="">Payment</div>
                <div className="">Action</div>
              </div>
            </div>
            <div>
              {artworks.length > 0 ? (
                artworks.map((artwork) => (
                  <AuctionTableItem key={artwork._id} data={artwork} updateList={getAllArtworks} />
                ))
              ) : (
                <EmptyList />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
Renders a table row to display a single auction in the auction table
*/
const AuctionTableItem = ({ data, updateList }) => {
  const endDate = data.enddate.split(',')[0];
  return (
    <>
      <div
        tabIndex="0"
        className="focus:outline-none grid grid-cols-7 border my-2 border-gray-100 rounded w-full justify-between p-5 transition-all">
        <div className="flex items-center col-span-2">
          <FaPaintBrush />
          <p className="text-base ml-2  capitalize font-medium text-gray-700">{data.title}</p>
        </div>
        <div className="flex items-center">
          <MdOutlineCreate />
          <p className="text-sm leading-none text-gray-600 ml-2">{endDate}</p>
        </div>
        <div className="flex items-center">
          {<BsChatLeftDots />}
          <p className="text-sm leading-none text-gray-600 ml-2">{data.totalBids}</p>
        </div>
        <div className="flex items-center">
          {<AiOutlineExclamationCircle />}
          <p className="text-sm capitalize leading-none text-gray-600 ml-2">{data.status}</p>
        </div>
        <div className="flex items-center">
          {<MdPayment />}
          <p className="text-sm capitalize leading-none text-gray-600 ml-2">
            {data.paymentStatus === 'claim'
              ? 'Pending'
              : data.paymentStatus === 'payment'
              ? 'Claimed'
              : data.paymentStatus === 'paid'
              ? 'Paid'
              : 'NA'}
          </p>
        </div>
        <div className="">
          <Drop artworkId={data._id} updateList={updateList} />
        </div>
      </div>
    </>
  );
};

/*
Sort data in the table based on auction status
*/
const SortTable = ({ updateStatus }) => {
  const data = ['All', 'Live', 'Closed'].map((item) => ({ label: item, value: item }));
  return (
    <div className="flex flex-grow justify-end">
      <SelectPicker
        cleanable={false}
        defaultValue="All"
        onChange={(value) => {
          updateStatus(value);
          console.log(value);
        }}
        searchable={false}
        data={data}
        style={{ width: 224 }}
      />
    </div>
  );
};

/*
Renders a dropdown list with options to view and delete auction
*/
const Drop = ({ artworkId, updateList }) => {
  const toaster = useToaster();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const navigate = useNavigate();
  const [delLoading, setDelLoading] = useState(false);

  const handleViewArtworkClick = async () => {
    const res = await API.get(`/api/artworks/artwork/${artworkId}`);
    if (res.data) {
      const artwork = res.data[0];
      navigate(`/auctions/${artworkId}`, { state: { artwork } });
    }
  };

  const handleDeleteArtworkClick = async () => {
    setDelLoading(true);
    await API.delete(`/api/artworks/artwork/delete/${artworkId}`, {
      headers: {
        token: 'Bearer ' + auth.token
      }
    })
      .then(async (res) => {
        if (updateList !== null) await updateList('All');
        console.log(res.data);
        Toaster(toaster, 'success', 'Artwork Deleted');
        setDelLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Toaster(toaster, 'error', err.response.data.message);
        setDelLoading(false);
      });
  };
  return (
    <>
      <div className="flex space-x-2 items-center">
        <button
          onClick={handleViewArtworkClick}
          className="text-lg text-white leading-none  py-1 px-2 rounded primary focus:outline-none bg-primary active:bg-cyan-700 hover:bg-cyan-700">
          <BsViewList />
        </button>
        <button
          onClick={handleDeleteArtworkClick}
          className="text-lg text-white leading-none  py-1 px-2 rounded primary focus:outline-none bg-red-500 active:bg-red-700 hover:bg-red-700">
          {delLoading ? <Loader /> : <RiDeleteBin6Fill />}
        </button>
      </div>
    </>
  );
};

export default AuctionTable;
