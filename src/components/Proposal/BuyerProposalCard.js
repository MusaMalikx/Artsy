import React from 'react';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { useState } from 'react';
import ProposalDrawer from './Drawer/BuyerProposalDrawer';
export default function ProposalCard({ proposal, updateProposals }) {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [showDrawer, SetShowDrawer] = useState(false);
  const [checkBid, setCheckBid] = useState(false);
  const openDrawer = () => {
    //This also checks if artist has already placed a bid on this proposal
    SetShowDrawer(true);
    let flag = false;
    proposal.artistProposals.forEach((artistBid) => {
      if (artistBid.artistId === auth.user._id) {
        flag = true;
        return;
      }
    });
    setCheckBid(flag);
  };
  return (
    <>
      <div
        onClick={openDrawer}
        className="border hover:scale-105 transition-all  my-5 p-5 hover:cursor-pointer hover:shadow-xl hover:bg-slate-100">
        <div className="flex lg:flex-row flex-col justify-center text-center lg:text-left items-center gap-6">
          <div className=" rounded-full relative w-24 h-24 overflow-hidden">
            <img
              className=" w-full h-full object-cover "
              src={
                proposal.buyerInfo.image !== ''
                  ? proposal.buyerInfo.image
                  : 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'
              }
              alt=""
            />
          </div>
          <div className="font-bold flex lg:flex-row flex-col justify-center items-center gap-4 lg:justify-between w-full">
            <div className="w-1/4">
              <p className="text-green-500 text-lg">{proposal.buyerInfo.name}</p>
              <p className="font-light">Lahore, Punjab, Pakistan</p>
            </div>

            <div className="flex flex-col lg:w-full">
              <p className="text-2xl font-bold ">{proposal.title}</p>
              <p className="text-lg">
                Expected : <span className=" text-red-500 "> {proposal.expectedAmount}</span>{' '}
              </p>
              <p className="lg:text-justify text-center font-light">
                {proposal.description.slice(0, 250) + ' ...'}
              </p>
            </div>
            <div className="my-auto text-3xl hover:text-green-500">
              <ArrowRightLineIcon />
            </div>
          </div>
        </div>
      </div>
      {showDrawer === true ? (
        <ProposalDrawer
          proposal={proposal}
          setOpen={SetShowDrawer}
          updateProposalList={updateProposals}
          bidPlaced={checkBid}
        />
      ) : (
        ''
      )}
    </>
  );
}
