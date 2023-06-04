import React from 'react';
import Lottie from 'react-lottie-player';
import { useEffect } from 'react';
import { useState } from 'react';
import profileAuctionListing from '../../assets/json/profileAuctionListing';

/*
Component for display animations in case of empty profile auctions
*/
const EmptyProfileAuctions = () => {
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    const interval = setTimeout(() => {
      setAnimate(false);
    }, 3500);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className="w-full p-20 pt-0 h-full flex flex-col justify-center items-center">
      <div className="w-[50vh] h-[40vh]">
        <Lottie play={animate} animationData={profileAuctionListing} loop />
      </div>
      <div className="text-center w-full">
        <p className="text-lg text-red-500 font-semibold">Empty Auction List!</p>
        <p className=" text-center">User has no auction artworks listed at the moment.</p>
      </div>
    </div>
  );
};

export default EmptyProfileAuctions;
