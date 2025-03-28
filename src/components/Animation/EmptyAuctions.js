import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Lottie from 'react-lottie-player';
import auctionLoading from '../../assets/json/auctionLoading';

/*
Component for display animations in case of empty auction list
*/
const EmptyAuctions = ({ status }) => {
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    const interval = setTimeout(() => {
      setAnimate(false);
    }, 4500);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className="w-full p-20 pt-0 h-full flex flex-col justify-center items-center">
      <div className="w-[50vh] h-[50vh]">
        <Lottie play={animate} animationData={auctionLoading} loop />
      </div>
      <div className="text-center w-full">
        <p className="text-lg text-red-500 font-semibold">No artwork auction is {status} now!</p>
        <p className=" text-center">
          Stay in contact with us. We will let you know when there is an artwork auction live.
        </p>
      </div>
    </div>
  );
};

export default EmptyAuctions;
