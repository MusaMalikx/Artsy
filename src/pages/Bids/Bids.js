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
  const handleClick = () => {
    navigate(`/auctions/${artwork._id}`, { state: { artwork } });
  };
  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer flex-col sm:flex-row items-center space-y-3 border-t shadow-md border-gray-50 bg-white m-5 rounded-xl p-5 transition-all hover:scale-95">
      <div>
        <img
          className="w-32 h-16 bg-center bg-cover rounded-md"
          // src='https://www.loonapix.com/img/filter/list/1562708307.jpg'
          src={`http://localhost:8080/api/artworks/image?filename=${artwork.images[0]}`}
          alt={artwork.title}
        />
      </div>
      <div className="ml-5 flex flex-col sm:flex-row text-center sm:text-start sm:justify-between sm:items-center w-full">
        <div>
          <p className="text-lg text-gray-500 font-semibold">{artwork.title}</p>
          <h1 className="text-gray-700 text-base font-light">
            Current Bid : <span className="font-bold text-red-500 "> ${artwork.currentbid}</span>
          </h1>
        </div>
        <div>
          <h1 className="text-gray-700 text-base font-light">
            Your Bid : <span className="font-bold text-green-500 "> ${artwork.myBid.bid}</span>
          </h1>
          <p className="text-md mb-0 font-mono text-green-600">
            <AuctionItemTimer endDate={artwork.enddate} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bids;
