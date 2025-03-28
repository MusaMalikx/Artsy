import React, { useState } from 'react';
import ReactJdenticon from 'react-jdenticon';
import { useNavigate } from 'react-router-dom';
import { Drawer } from 'rsuite';
import ArtistProposal from '../../Modals/Proposal/ArtistProposal';

/*
This React component represents the Artist Proposal drawer used in on-demand auctions. 
It provides functionality for managing and displaying proposals submitted by artists.
*/
export default function ProposalDrawer({ setOpen, proposal, updateProposalList, bidPlaced }) {
  const [openField, setOpenField] = useState(false);
  const [openBidPlaced, setOpenBidPlaced] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Drawer size="xs" open={true} onClose={() => setOpen(false)}>
        <Drawer.Body>
          <div className="w-full mt-16 rounded-lg flex justify-center flex-col align-middle  ">
            <div className="flex flex-col items-center gap-6">
              <div className="shadow-all object-cover align-middle border-none bg-white">
                <ReactJdenticon size="200" value={proposal.buyerInfo.email} />
              </div>
              <div className="font-bold text-center justify-between w-full">
                <p className="text-green-500 capitalize text-xl">{proposal.buyerInfo.name}</p>
                <p className="font-light">Lahore, Punjab, Pakistan</p>
                <p
                  onClick={() => {
                    navigate(`/buyer/profile/${proposal.buyerInfo.buyerId}`);
                  }}
                  className=" underline cursor-pointer hover:text-black hover:font-semibold">
                  View Profile
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <p className="text-lg font-bold ">
                {' '}
                Expected : <span className=" text-red-500 ">
                  {' '}
                  Rs. {proposal.expectedAmount}
                </span>{' '}
              </p>
              <p className="text-lg font-bold mt-6"> {proposal.title}</p>
              <p className="text-justify break-all">{proposal.description}</p>
            </div>
            {bidPlaced == true ? (
              <button
                onClick={() => {
                  setOpenField(true);
                  setOpenBidPlaced(true);
                }}
                className="mt-10 w-full focus:outline-none border py-3 rounded-lg bg-primary hover:bg-cyan-700 text-white font-bold ">
                You Already Placed Bid
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpenField(true);
                  setOpenBidPlaced(false);
                }}
                className="mt-10 w-full focus:outline-none border py-3 rounded-lg bg-primary hover:bg-cyan-700 text-white font-bold ">
                Bid Now
              </button>
            )}
            {
              <ArtistProposal
                isOpen={openField}
                setIsOpen={setOpenField}
                updateProposalList={updateProposalList}
                proposalId={proposal}
                isBidPlaced={openBidPlaced}
                setIsOpenDrawer={setOpen}
              />
            }
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
}
