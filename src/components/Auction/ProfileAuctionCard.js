import React from 'react';

import { useNavigate } from 'react-router-dom';

import AuctionItemTimer from '../Common/Timer/AuctionItemTimer';

export default function ProfileAuctionCard({ artwork }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/auctions/${artwork?.status}/1/${artwork._id}`, { state: { artwork } });
  };
  const artworkObj = { id: artwork._id, status: artwork.status, title: artwork.title };

  return (
    <div className="py-6 flex justify-center hover:scale-95 mr-3 transition-all">
      <div className="flex lg:flex-row flex-col w-[600px] items-center bg-white shadow-all rounded-lg overflow-hidden">
        <div className="lg:w-1/4 h-32 bg-center bg-cover lg:my-0 my-10 w-40">
          <img
            className="w-full lg:h-full h-40 bg-center bg-cover lg:rounded-md rounded-full"
            // src={`http://localhost:8080/api/artworks/image?filename=${artwork.images[0]}`}
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
              Highest Bid :{' '}
              <span className="font-bold text-green-500 "> PKR {artwork.currentbid}</span>
            </h1>
          </div>
          <div className="flex sm:justify-around sm:flex-row flex-col justify-center items-center sm:items-start lg:justify-between gap-2 md:gap-0 mt-3 text-center">
            <p className="text-md mb-0 font-mono text-green-700 sm:text-xl text-base font-bold">
              <AuctionItemTimer
                endDate={artwork.enddate}
                startDate={artwork.startdate}
                artwork={artworkObj}
              />
            </p>
            <button
              onClick={handleClick}
              className="px-3 py-2 bg-primary text-white text-xs font-bold uppercase rounded focus:outline-none active:bg-cyan-700">
              View Artwork
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
