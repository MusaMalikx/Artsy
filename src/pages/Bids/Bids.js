import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/server';
import EmptyBidList from '../../components/Animation/EmptyBidList';
import AuctionItemTimer from '../../components/Common/Timer/AuctionItemTimer';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';

/*
Component for displaying the bids table.
This component renders the table that shows the bids placed by users.
It handles the display and interaction logic for the bids data.
*/
const Bids = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [bidList, setBidList] = useState([]);
  const getBidList = async () => {
    const res = await API.get(`/api/users/bid/list/${auth.user._id}`);
    if (res.data.length > 0 && res.data[0] !== null) {
      setBidList(res.data);
    }
  };
  useEffect(() => {
    getBidList();
  }, []);

  return (
    <Layout title="Bids">
      <HeaderLayout title="Bids" />
      <div className="flex-grow min-h-screen flex justify-center mb-5">
        <div className="max-w-5xl w-full bg-gray-100 h-fit px-10 py-6 rounded-xl">
          {bidList.length > 0 ? (
            bidList.map((art) => <BidItem key={art._id} artwork={art} />)
          ) : (
            <EmptyBidList />
          )}
        </div>
      </div>
    </Layout>
  );
};

//This component renders a single bid item in the Bid List table
const BidItem = ({ artwork }) => {
  const navigate = useNavigate();
  const artworkObj = { id: artwork._id, status: artwork.status, title: artwork.title };
  const handleClick = () => {
    navigate(`/auctions/${artwork.status}/1/${artwork._id}`, { state: { artwork } });
  };
  return (
    <div
      onClick={handleClick}
      className="py-6 cursor-pointer flex justify-center hover:scale-105 transition-all">
      <div className="flex lg:flex-row flex-col w-full items-center bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:w-1/4 h-32 bg-center bg-cover lg:my-0 my-10 w-40">
          <img
            className="w-full lg:h-full h-40 bg-center bg-cover lg:rounded-md rounded-full"
            src={artwork.images[0]}
            alt={artwork.title}
          />
        </div>
        <div className="w-full h-full hover:bg-slate-100 p-4 text-left flex flex-col justify-between">
          <div className="flex  w-full sm:justify-around sm:flex-row flex-col gap-2 md:gap-0 justify-center items-center sm:items-start lg:justify-between text-center">
            <h1 className="text-gray-700 font-bold sm:text-xl text-base capitalize ">
              {artwork.title}
            </h1>
            <h1 className="font-bold sm:text-xl text-base text-gray-700">
              Your Bid : <span className="font-bold text-green-500 "> PKR{artwork.myBid.bid}</span>
            </h1>
          </div>
          <div className="flex sm:justify-around sm:flex-row flex-col justify-center items-center sm:items-start lg:justify-between gap-2 md:gap-0 mt-3 text-center">
            <h1 className="font-bold sm:text-xl text-base text-gray-700">
              Current Bid :{' '}
              <span className="font-bold text-green-500 "> PKR {artwork.currentbid}</span>
            </h1>
            <p className="text-md mb-0 font-mono text-green-700 sm:text-xl text-base font-bold">
              <AuctionItemTimer
                endDate={artwork.enddate}
                startDate={artwork.startdate}
                artwork={artworkObj}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bids;
