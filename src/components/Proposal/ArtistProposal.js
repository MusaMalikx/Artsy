import React from 'react';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { useState } from 'react';
import ProposalDrawer from './Drawer/ArtistProposalDrawer';
import ReactJdenticon from 'react-jdenticon';

/*
This component represents a card displaying information about an artist proposal for an on-demand auction. 
It handles rendering the necessary details and interactions related to the proposal.
*/
export default function ArtistProposalCard({ proposalInfo }) {
  const [showDrawer, SetShowDrawer] = useState(false);
  return (
    <>
      <div
        onClick={() => SetShowDrawer(true)}
        className="border hover:scale-105 transition-all  my-5 p-5 hover:cursor-pointer hover:shadow-xl hover:bg-slate-100">
        <div className="flex lg:flex-row flex-col justify-center text-center lg:text-left items-center gap-6">
          <div className="shadow-xl object-cover align-middle border-none bg-white">
            <ReactJdenticon size="120" value={proposalInfo.email} />
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
              <p className="lg:text-justify text-center font-light break-all">
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
