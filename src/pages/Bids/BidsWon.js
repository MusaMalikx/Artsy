import React, { useState, useEffect } from 'react';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import Layout from '../../components/Layouts/ArticleLayout';
import PaymentRelease from '../../components/Modals/Payment/PaymentRelease';
import GiveReview from '../../components/Modals/Review/GiveReview';
import API from '../../api/server';
import EmptyBidList from '../../components/Animation/EmptyBidList';
import { useToaster } from 'rsuite';
import Toaster from '../../components/Common/Toaster';
import { v4 as uuid } from 'uuid';
import { sendNotification } from '../../helpers/notifications';
import moment from 'moment';

/*
Display a list of auctions won by the user.
Each item in the list represents a single auction won.
Provides visibility and quick access to the user's successful bids.
*/
const BidsWon = () => {
  const [paymentRelease, setPaymentRelease] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState({});
  const [giveReview, setGiveReview] = useState(false);
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [wonArt, setWonArt] = useState([]);
  const toaster = useToaster();

  //API call for getting all the won artworks
  const getArtworks = async () => {
    const res = await API.get(`/api/users/find/artworks/won/${auth.user._id}`);
    setWonArt(res.data);
  };

  useEffect(() => {
    getArtworks();
  }, []);

  const handlePayment = () => {
    setPaymentRelease(false);
    setGiveReview(true);
  };

  //API call for claiming a won artwork
  const claimArtwork = async (artwork) => {
    try {
      const res = await API.post(
        `/api/users/artworks/claim/${artwork._id}`,
        {
          acceptedAmount: artwork.currentbid,
          artistId: artwork.artistId
        },
        {
          headers: {
            token: 'Bearer ' + auth.token
          }
        }
      );
      if (res.status !== 200) {
        Toaster(toaster, 'error', 'Error Occured');
      } else {
        //Making an API call for sending a notification of
        await sendNotification(
          artwork.artistFid,
          uuid(),
          `Your artwork ${artwork.title} has been claimed by ${auth.user.name}.`
        );
        Toaster(toaster, 'success', 'Artwork claimed succesfully!');
        getArtworks();
      }
    } catch (error) {
      Toaster(toaster, 'error', 'Insufficient credits in wallet!');
    }
  };

  return (
    <Layout title="Bids">
      <PaymentRelease
        updateList={getArtworks}
        artwork={selectedArtwork}
        open={paymentRelease}
        setOpen={setPaymentRelease}
        setGiveReview={handlePayment}
      />
      <GiveReview artwork={selectedArtwork} open={giveReview} setOpen={setGiveReview} />
      <HeaderLayout title="Bids Won" />
      <div className="flex-grow min-h-screen flex justify-center mb-5">
        <div className="max-w-5xl w-full bg-gray-100 h-fit px-10 py-6 rounded-xl">
          {wonArt.length > 0 ? (
            wonArt.map((art) => {
              return (
                <>
                  <div className="py-6 flex justify-center hover:scale-105 transition-all">
                    <div className="flex lg:flex-row flex-col w-full items-center bg-white shadow-lg rounded-lg overflow-hidden">
                      <div className="lg:w-1/4 h-32 bg-center bg-cover lg:my-0 my-10 w-40">
                        <img
                          className="w-full lg:h-full h-40 bg-center bg-cover lg:rounded-md rounded-full"
                          src={art.images[0]}
                          alt={art.title}
                        />
                      </div>
                      <div className="w-full h-full hover:bg-slate-100 p-4 text-left flex flex-col sm:flex-row justify-between">
                        <div className="flex  w-full sm:justify-around flex-col gap-2 md:gap-0 justify-center items-center sm:items-start lg:justify-between text-center">
                          <h1 className="text-gray-700 font-bold sm:text-xl text-base capitalize ">
                            {art.title}
                          </h1>
                          <h1 className="font-bold sm:text-xl text-base text-gray-700">
                            Your Bid :{' '}
                            <span className="font-bold text-green-500 "> PKR {art.currentbid}</span>
                          </h1>
                          <h1 className="font-bold sm:text-xl text-base text-gray-700">
                            Won :{' '}
                            <span className="font-bold text-blue-500 ">
                              {' '}
                              {moment(art.enddate).format('DD/mm/yyyy hh:mm A')}
                            </span>
                          </h1>
                        </div>
                        <div className="text-md mb-0 font-mono text-green-700 sm:text-xl text-base font-bold">
                          {art.paymentStatus === 'payment' ? (
                            <button
                              className="hide py-2 px-10 mx-2 rounded text-white bg-primary border active:bg-emerald-500"
                              onClick={() => {
                                setPaymentRelease(true);
                                setSelectedArtwork(art);
                              }}>
                              Payment
                            </button>
                          ) : art.paymentStatus === 'claim' ? (
                            <button
                              onClick={() => claimArtwork(art)}
                              className="hide py-2 px-10 mx-2 rounded text-white bg-primary border active:bg-emerald-500">
                              Claim
                            </button>
                          ) : (
                            <button className="hide py-2 px-10 mx-2 rounded text-white bg-red-500 border cursor-not-allowed">
                              Paid
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <EmptyBidList />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BidsWon;
