import React from 'react'
import { RiAuctionLine } from "react-icons/ri"
import { AiOutlineHeart } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"

const AuctionCard = ({ photo }) => {
  const { user, urls } = photo;
  return (
    <div className='mx-auto hover:scale-90 transition-all p-5 mb-10 border rounded-md'>
      <div className='flex space-x-4'>
        <div className='space-y-2'>
          <RiAuctionLine size={37} className="border rounded-md p-2 cursor-pointer bg-primary" color='white' />
          <AiOutlineHeart size={37} className="border rounded-md p-2 cursor-pointer" />
          <BiSearch size={37} className="border rounded-md p-2 cursor-pointer" />
        </div>
        <div>
          <img
            className='w-40 h-32 rounded-md cursor-pointer'
            // src='https://www.loonapix.com/img/filter/list/1562708307.jpg'
            src={urls.thumb}
            alt={user.username} />
        </div>
      </div>
      <div className='flex flex-col my-5 border rounded-md'>
        <p className='text-gray-500 text-center font-semibold mt-2'>Time left</p>
        <div className='flex items-center justify-around'>
          <div className='w-[1px] h-10 border' />
          <div className='my-3 flex flex-col items-center'>
            <span className='font-bold text-lg'>97</span>
            <span className='mb-1 text-[8px]'>Days</span>
            </div>
          <div className='w-[1px] h-10 border' />
          <div className='my-3 flex flex-col items-center'>
            <span className='font-bold text-lg'>97</span>
            <span className='mb-1 text-[8px]'>Hours</span>
            </div>
          <div className='w-[1px] h-10 border' />
          <div className='my-3 flex flex-col items-center'>
            <span className='font-bold text-lg'>97</span>
            <span className='mb-1 text-[8px]'>Minutes</span>
            </div>
          <div className='w-[1px] h-10 border' />
          <div className='my-3 flex flex-col items-center'>
            <span className='font-bold text-lg'>97</span>
            <span className='mb-1 text-[8px]'>Seconds</span>
            </div>
          <div className='w-[1px] h-10 border' />
        </div>
      </div>
      <hr />
      <div>
        <p className='font-extrabold text-black text-xl text-center'>Le bouquet de Paris</p>
        <p className='text-center'>current Bid: <span className='font-bold'>$51</span></p>
      </div>
    </div>
  )
}

export default AuctionCard