import moment from 'moment/moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';

/* 
Renders only won auction card displaying auction details in the auction list on user profile. 
*/
export default function ProfileWonAuctionCard({ artwork }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/auctions/${artwork?.status}/1/${artwork._id}`, { state: { artwork } });
  };
  return (
    <div className="py-6 flex justify-center hover:scale-95 transition-all mr-3">
      <div className="flex lg:flex-row flex-col w-[600px] items-center bg-white shadow-all rounded-lg overflow-hidden">
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
              Winning Bid :{' '}
              <span className="font-bold text-green-500 "> PKR {artwork.currentbid}</span>
            </h1>
          </div>
          <div className="flex sm:justify-around sm:flex-row flex-col justify-center items-center sm:items-start lg:justify-between gap-2 md:gap-0 mt-3 text-center">
            <p className="text-md mb-0 font-mono text-red-700 sm:text-xl text-base font-bold">
              {moment(artwork.enddate).format('DD/MM/YYYY hh:mm A')}
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
