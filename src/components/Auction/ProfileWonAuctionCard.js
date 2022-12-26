import React from 'react';

export default function ProfileWonAuctionCard({ photo }) {
  const { user, urls } = photo;
  return (
    <div className="py-6 flex justify-center hover:scale-105 transition-all">
      <div className="flex w-3/4 items-center bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="w-32 h-44 md:h-32 bg-center bg-cover"
          style={{
            backgroundImage: `url('${urls.thumb}')`
          }}></div>
        <div className="w-full h-full hover:bg-slate-100 p-4 text-left flex flex-col justify-between">
          <div className="flex  w-full md:justify-between md:flex-row flex-col gap-2 md:gap-0 justify-center">
            <h1 className="text-gray-900 font-bold text-2xl">{user.username}</h1>
            <p className="font-bold text-xl text-black">2nd January, 2022</p>
          </div>
          <div className="flex md:justify-between md:flex-row flex-col justify-center gap-2 md:gap-0 mt-3">
            <h1 className="text-gray-700 text-base font-light">
              Winning Bid : <span className="font-bold text-green-500 "> $70</span>
            </h1>
            <button className="px-3 py-2 bg-primary text-white text-xs font-bold uppercase rounded focus:outline-none active:bg-cyan-700">
              View Artwork
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
