import React from 'react';
import Lottie from 'react-lottie-player';
import proposalLoading from '../../assets/json/proposalLoading';

/*
Component for display animations in case of empty proposal list
*/
const EmptyProposal = () => {
  return (
    <div className="w-full p-20 pt-0 h-full flex flex-col justify-center items-center">
      <div className="w-[50vh] h-[50vh]">
        <Lottie play animationData={proposalLoading} loop />
      </div>
      <div className="text-center w-full">
        <p className="text-lg text-red-500 font-semibold">Empty list!</p>
        <p className=" text-center">No proposal is listed at the moment.</p>
      </div>
    </div>
  );
};

export default EmptyProposal;
