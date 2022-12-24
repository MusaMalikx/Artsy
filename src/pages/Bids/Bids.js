import React from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';

const Bids = ({ data }) => {
  console.log(data);
  return (
    <Layout title="Bids">
      <HeaderLayout title="Bids" />
      <div className="flex-grow flex justify-center mb-5">
        <div className="max-w-5xl w-full bg-gray-100 h-fit px-10 py-6 rounded-xl">
          {data?.map((photo) => (
            <BidItem key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
      {/* <div className="w-96 bg-primary text-white rounded-r-xl lg:rounded-r-none rounded-l-xl p-5 flex mx-auto my-10 flex-col">
          <div className="flex-grow">
            <p className="lg:text-4xl text-3xl font-black leading-9">Summary</p>
            <div className="flex items-center justify-between pt-16">
              <p className="text-base leading-none">Subtotal</p>
              <p className="text-base leading-none">,000</p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none">Shipping</p>
              <p className="text-base leading-none"></p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none">Tax</p>
              <p className="text-base leading-none"></p>
            </div>
          </div>
          <div>
            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
              <p className="text-2xl leading-normal">Total</p>
              <p className="text-2xl font-bold leading-normal text-right">,240</p>
            </div>
            <button className="text-base leading-none w-full rounded-xl py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              Checkout
            </button>
          </div>
        </div> */}
    </Layout>
  );
};

const BidItem = ({ photo }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center space-y-3 border-t shadow-md border-gray-50 bg-white m-5 rounded-xl p-5 transition-all hover:scale-95">
      <div
        className="w-32 h-16 bg-center bg-cover"
        style={{
          backgroundImage: `url('${photo.urls.thumb}')`
        }}></div>
      <div className="ml-5 flex flex-col sm:flex-row text-center sm:text-start sm:justify-between sm:items-center w-full">
        <div>
          <p>NAme</p>
          <h1 className="text-gray-700 text-base font-light">
            Current Bid : <span className="font-bold text-red-500 "> $51</span>
          </h1>
        </div>
        <div>
          <h1 className="text-gray-700 text-base font-light">
            Your Bid : <span className="font-bold text-green-500 "> $51</span>
          </h1>
          <p className="text-md mb-0 font-mono text-green-600">21:21:00</p>
        </div>
      </div>
    </div>
  );
};

export default Bids;
