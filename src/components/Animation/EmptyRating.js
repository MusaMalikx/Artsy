import React from 'react';
import Lottie from 'react-lottie-player';
import listLoading from '../../assets/json/rating';

/*
Component for display animations in case of empty rating list
*/
const EmptyRating = () => {
  return (
    <div className="w-full p-20 pt-0 h-full flex flex-col justify-center items-center">
      <div className="w-[30vh] h-[30vh]">
        <Lottie play animationData={listLoading} loop />
      </div>
      <div className="text-center w-full">
        <p className="text-lg text-red-500 font-semibold">No Reviews!</p>
        <p className=" text-center">There are not any reviews yet for this artist.</p>
      </div>
    </div>
  );
};

export default EmptyRating;
