import React from 'react';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { useState } from 'react';
import ProposalDrawer from './Drawer/ArtistProposalDrawer';
export default function ArtistProposalCard({ proposalInfo }) {
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
              src={
                proposalInfo.artistImage !== ''
                  ? proposalInfo.artistImage
                  : 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'
              }
              alt="Profile Image"
            />
          </div>
          <div className="font-bold flex lg:flex-row flex-col justify-center items-center gap-4 lg:justify-between w-full">
            <div className="w-1/4">
              <p className="text-green-500 capitalize text-lg">{proposalInfo.artistName}</p>
              <p className="font-light">Karachi, Sindh, Pakistan</p>
            </div>
            <div className="flex flex-col lg:w-full">
              <p className="text-2xl capitalize font-bold ">{proposalInfo.title}</p>
              <p className="text-lg">
                Bid Amount : <span className=" text-red-500 "> Rs. {proposalInfo.bidAmount}</span>{' '}
              </p>
              <p className="lg:text-justify text-center font-light">
                {proposalInfo.description.slice(0, 250) + ' ...'}
              </p>
            </div>
            <div className="my-auto text-3xl hover:text-green-500">
              <ArrowRightLineIcon />
            </div>
          </div>
        </div>
      </div>
      {showDrawer === true ? (
        <ProposalDrawer proposalInfo={proposalInfo} setOpen={SetShowDrawer} />
      ) : (
        ''
      )}
    </>
  );
}
