import React from 'react';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { useState } from 'react';
import ProposalDrawer from './Drawer/ArtistProposalDrawer';
export default function ArtistProposalCard() {
  const text =
    'Lorem ipsum dolorsad sit amet consectetur, adipisicing elit. Fugit nihil rem corporis molestiae mollitia! Maiores perspiciatis animi exercitationem, voluptate omnis odit consectetur nam nisi esse, ipisicing elit. Fugit nihil rem corporis molestiae mollitia! Maiores perspiciatis animi exercitationem, voluptate omnis odit consectetur nam nisi esse, ducimus porro architecto? Corporis, suscipit ducimus porro architecto? Corporis, suscipit.';
  const [showDrawer, SetShowDrawer] = useState(false);
  return (
    <>
      <div
        onClick={() => SetShowDrawer(true)}
        className="border hover:scale-105 transition-all  my-5 p-5 hover:cursor-pointer hover:shadow-xl hover:bg-slate-100">
        <div className="flex lg:flex-row flex-col justify-center text-center lg:text-left items-center gap-6">
          <div className=" rounded-full relative w-24 h-24 overflow-hidden">
            <img
              className=" w-full h-full object-cover "
              src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_51/1395922/julia-roberts-realized-fame-today-main-181218.jpg"
              alt=""
            />
          </div>
          <div className="font-bold flex lg:flex-row flex-col justify-center items-center gap-4 lg:justify-between w-full">
            <div className="w-1/4">
              <p className="text-green-500 text-lg">Julia Roberts</p>
              <p className="font-light">Karachi, Sindh, Pakistan</p>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-bold ">Ocean Potrait</p>
              <p className="text-lg">
                Bid Amount : <span className=" text-red-500 "> Rs. 5500</span>{' '}
              </p>
              <p className="text-justify font-light">{text.slice(0, 250) + ' ...'}</p>
            </div>
            <div className="my-auto text-3xl hover:text-green-500">
              <ArrowRightLineIcon />
            </div>
          </div>
        </div>
      </div>
      {showDrawer === true ? <ProposalDrawer setOpen={SetShowDrawer} /> : ''}
    </>
  );
}
