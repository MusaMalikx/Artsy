import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/server';
import EmptyBidList from '../../components/Animation/EmptyBidList';
import AuctionItemTimer from '../../components/Common/Timer/AuctionItemTimer';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';

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
      {/* <div className="w-96 bg-primary text-white rounded-r-xl lg:rounded-r-none rounded-l-xl p-5 flex mx-auto my-10 flex-col">
          <div className="flex-grow">
            <p className="lg:text-4xl text-3xl font-black leading-9">Summary</p>
            <div className="flex items-center justify-between pt-16">
              <p className="text-base leading-none">Subtotal</p>
              <p className="text-base leading-none">,000</p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none">Shipping</p>
              <p className="text-base leading-none"></p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none">Tax</p>
              <p className="text-base leading-none"></p>
            </div>
          </div>
          <div>
            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
              <p className="text-2xl leading-normal">Total</p>
              <p className="text-2xl font-bold leading-normal text-right">,240</p>
            </div>
            <button className="text-base leading-none w-full rounded-xl py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              Checkout
            </button>
          </div>
        </div> */}
    </Layout>
  );
};

const BidItem = ({ artwork }) => {
  const navigate = useNavigate();
  const artworkObj = { id: artwork._id, status: artwork.status };
  const handleClick = () => {
    navigate(`/auctions/${artwork._id}`, { state: { artwork } });
  };
  return (
    <div
      onClick={handleClick}
      className="py-6 cursor-pointer flex justify-center hover:scale-105 transition-all">
      <div className="flex lg:flex-row flex-col w-full items-center bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:w-1/4 h-32 bg-center bg-cover lg:my-0 my-10 w-40">
          <img
            className="w-full lg:h-full h-40 bg-center bg-cover lg:rounded-md rounded-full"
            src={`http://localhost:8080/api/artworks/image?filename=${artwork.images[0]}`}
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
