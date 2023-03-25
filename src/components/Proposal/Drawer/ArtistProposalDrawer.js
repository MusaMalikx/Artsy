import React from 'react';
import ReactJdenticon from 'react-jdenticon';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer, useToaster } from 'rsuite';
import API from '../../../api/server';
import Toaster from '../../Common/Toaster';

export default function ArtistDrawer({ setOpen, proposalInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const proposalId = location.pathname.split('/')[4];
  const auth = JSON.parse(localStorage.getItem('auth'));
  const toaster = useToaster();

  const acceptProposal = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(
        `/api/users/proposal/accept/${proposalId}`,
        {
          acceptedAmount: proposalInfo.bidAmount,
          artistInfo: {
            artistId: proposalInfo.artistId,
            artistName: proposalInfo.artistName
          }
        },
        {
          headers: {
            token: 'Bearer ' + auth.token
          }
        }
      );
      if (res.status === 200) {
        navigate('/view/buyer/accepted/proposal');
        Toaster(toaster, 'success', 'Proposal succesfully accepted!');
      } else {
        Toaster(toaster, 'error', 'Error occured!');
      }
    } catch (error) {
      Toaster(toaster, 'error', 'Insufficient credits in wallet!');
    }
  };

  return (
    <>
      <Drawer size="xs" open={true} onClose={() => setOpen(false)}>
        <Drawer.Body>
          <div className="   w-full mt-16 rounded-lg flex justify-center flex-col align-middle  ">
            <div className="flex flex-col items-center gap-6">
              <div className="shadow-all object-cover align-middle border-none bg-white">
                <ReactJdenticon size="200" value={proposalInfo.email} />
              </div>
              {/* <div className=" rounded-full relative w-40 h-40 overflow-hidden">
                <img
                  className=" w-full h-full object-cover "
                  src={
                    proposalInfo.artistImage !== ''
                      ? proposalInfo.artistImage
                      : 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'
                  }
                  alt="Profile Image"
                />
              </div> */}
              <div className="font-bold text-center justify-between w-full">
                <p className="text-green-500 capitalize text-xl">{proposalInfo.artistName}</p>
                <p className="font-light">Karachi, Sindh, Pakistan</p>
                <p
                  onClick={() => {
                    navigate(`/artist/profile/${proposalInfo.artistId}`);
                  }}
                  className=" underline cursor-pointer hover:text-black hover:font-semibold ">
                  View Profile
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <p className="text-lg font-bold ">
                {' '}
                Bid Amount: <span className=" text-red-500 ">
                  {' '}
                  Rs. {proposalInfo.bidAmount}
                </span>{' '}
              </p>
              <p className="text-lg font-bold mt-6">Description</p>
              <p className="text-justify">{proposalInfo.description}</p>
            </div>
            <button
              onClick={acceptProposal}
              className="mt-10 w-full focus:outline-none border py-3 rounded-lg bg-primary hover:bg-cyan-700 text-white font-bold ">
              Accept
            </button>
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
}
