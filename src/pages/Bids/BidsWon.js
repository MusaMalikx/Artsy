import React, { useState } from 'react';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import Layout from '../../components/Layouts/ArticleLayout';
import PaymentRelease from '../../components/Modals/Payment/PaymentRelease';
import GiveReview from '../../components/Modals/Review/GiveReview';

const BidsWon = () => {
  const [paymentRelease, setPaymentRelease] = useState(false);
  const [giveReview, setGiveReview] = useState(false);
  const [claim, setClaim] = useState(false);

  const handlePayment = () => {
    setPaymentRelease(false);
    setGiveReview(true);
  };

  return (
    <Layout title="Bids">
      <PaymentRelease
        open={paymentRelease}
        setOpen={setPaymentRelease}
        setGiveReview={handlePayment}
      />
      <GiveReview open={giveReview} setOpen={setGiveReview} />
      <HeaderLayout title="Bids Won" />
      <div className="py-6 cursor-pointer flex justify-center hover:scale-105 transition-all max-w-5xl mx-auto">
        <div className="flex lg:flex-row flex-col w-full items-center bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="lg:w-1/4 h-32 bg-center bg-cover lg:my-0 my-10 w-40">
            {/* <img
            className="w-full lg:h-full h-40 bg-center bg-cover lg:rounded-md rounded-full"
            src={`http://localhost:8080/api/artworks/image?filename=${artwork.images[0]}`}
            alt="title"
          /> */}
          </div>
          <div className="w-full h-full hover:bg-slate-100 p-4 text-left flex flex-col justify-between">
            <div className="flex  w-full sm:justify-around sm:flex-row flex-col gap-2 md:gap-0 justify-center items-center sm:items-start lg:justify-between text-center">
              <h1 className="text-gray-700 font-bold sm:text-xl text-base capitalize ">title</h1>
              <h1 className="font-bold sm:text-xl text-base text-gray-700">
                Your Bid : <span className="font-bold text-green-500 "> PKR bid paisa</span>
              </h1>
            </div>
            <div className="flex sm:justify-around sm:flex-row flex-col justify-center items-center sm:items-start lg:justify-between gap-2 md:gap-0 mt-3 text-center">
              <p className="font-bold sm:text-lg text-base text-emerald-500">
                <span className="text-gray-700">Time Left: </span>00:00:00
              </p>
              {claim ? (
                <button
                  className="hide py-2 px-10 mx-2 rounded text-white bg-primary border active:bg-emerald-500"
                  onClick={() => setPaymentRelease(true)}>
                  Payment
                </button>
              ) : (
                <button
                  className="hide py-2 px-10 mx-2 rounded text-white bg-primary border active:bg-emerald-500"
                  onClick={() => setClaim(true)}>
                  Claim
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BidsWon;
