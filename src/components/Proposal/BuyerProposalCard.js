import React from 'react';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { useState } from 'react';
import ProposalDrawer from './Drawer/BuyerProposalDrawer';
import ReactJdenticon from 'react-jdenticon';

/*
This component represents a card displaying information about an Buyer proposal for an on-demand auction. 
It handles rendering the necessary details and interactions related to the proposal.
*/
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
        <div className="flex lg:flex-row flex-col justify-center text-center lg:text-left items-center gap-6 ">
          <div className="shadow-all object-cover align-middle border-none bg-white">
            <ReactJdenticon size="120" value={proposal.buyerInfo.email} />
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
              <p className="lg:text-justify text-center font-light break-all">
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
