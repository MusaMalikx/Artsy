import React from 'react';
import ReactJdenticon from 'react-jdenticon';
import { Rate } from 'rsuite';

/* 
Component responsible for displaying the description of a review
*/
export default function ReviewDescription({ rating }) {
  return (
    <div className="flex my-3 mr-3 md:flex-row flex-col justify-center items-center gap-2 p-4 border bg-white shadow-md hover:shodow-lg rounded-2xl">
      <div className="w-24 h-20 flex justify-center items-center overflow-hidden shadow-all ">
        {/* <img className="w-full h-full object-cover" src={rating.buyerPicture} alt="" /> */}
        <ReactJdenticon size="80" value={rating.buyerId} />
      </div>
      <div className="w-full text-sm flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="font-bold">{rating.buyerName}</span>
          <div className="flex text-yellow-500">
            <Rate value={rating.ratedValue} readOnly size="xs" />
          </div>
        </div>
        <span className="text-slate-600">{rating.date}</span>
        <span className="text-justify">{rating.description}</span>
      </div>
    </div>
  );
}
