import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import listLoading from '../../assets/json/listLoading';
const EmptyList = () => {
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    const interval = setTimeout(() => {
      setAnimate(false);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className="w-full p-20 pt-0 h-full flex flex-col justify-center items-center">
      <div className="w-[50vh] h-[50vh]">
        <Lottie play={animate} animationData={listLoading} loop />
      </div>
      <div className="text-center w-full">
        <p className="text-lg text-red-500 font-semibold">Empty List!</p>
        <p className=" text-center">You have no documents at the moment.</p>
      </div>
    </div>
  );
};

export default EmptyList;
