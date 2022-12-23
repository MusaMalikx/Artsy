import React from 'react';

export default function ProfileAuctionCard({ photo }) {
  const { user, urls } = photo;
  return (
    <div className="py-6 flex justify-center">
      <div className="flex w-3/4 items-center bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="w-32 h-44 md:h-32 bg-cover"
          style={{
            backgroundImage: `url('${urls.thumb}')`
          }}></div>
        <div className="w-full hover:bg-slate-100 p-4 text-left flex flex-col  justify-between">
          <div className="flex  w-full md:justify-between md:flex-row flex-col gap-2 md:gap-0 justify-center">
            <h1 className="text-gray-900 font-bold text-2xl">{user.username}</h1>
            <p className="font-bold text-xl text-green-500">21:21:00</p>
          </div>
          <div className="flex md:justify-between md:flex-row flex-col justify-center gap-2 md:gap-0 mt-3">
            <h1 className="text-gray-700 text-base font-light">
              Current Bid : <span className="font-bold text-red-500 "> $51</span>
            </h1>
            <button className="px-3 py-2 bg-primary text-white text-xs font-bold uppercase rounded focus:outline-none active:bg-cyan-700">
              Place a bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
