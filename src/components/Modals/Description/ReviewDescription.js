import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
export default function ReviewDescription() {
  return (
    <div className="flex my-3 md:flex-row flex-col justify-center items-center gap-2 p-4 border bg-white shadow-md hover:shodow-lg rounded-2xl">
      <div className="w-24 h-20 overflow-hidden rounded-full ">
        <img
          className="w-full h-full object-cover"
          src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
      </div>
      <div className="w-full text-sm flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="font-bold">Andrea Piacquadio</span>
          <div className="flex text-yellow-500">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
        </div>
        <span>5 weeks ago</span>
        <span className="text-justify">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde cupiditate nostrum
          voluptatem eos quaerat harum aliquid, perferendis dolores magnam laudantium libero
          voluptatum odit eveniet odio reprehenderit dolor autem perspiciatis reiciendis!
        </span>
      </div>
    </div>
  );
}
