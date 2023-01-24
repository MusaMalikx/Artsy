import Lottie from 'lottie-react';
import React from 'react';
import BidList from '../../assets/json/BidList.json';
const EmptyBidList = () => {
  console.log('JAAAAAAAAAAAAAWa');
  return (
    <div className="h-full w-full p-4">
      <div className="flex justify-center items center w-full h-80">
        <Lottie animationData={BidList} loop={true} />
      </div>
      <div className="text-center">
        <p className="text-lg text-red-500 font-semibold">Your Bid list is empty!</p>
        <p className=" text-center">
          Looks like you have not placed a bid on any artwork. Go ahead and explore artworks from
          top artists.
        </p>
      </div>
    </div>
  );
};

export default EmptyBidList;
