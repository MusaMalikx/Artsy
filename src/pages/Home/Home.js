import React from 'react';
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Layout from '../../components/Layouts/ArticleLayout';
import Banner from '../../assets/svgs/banner.svg';
import AuctionCard from '../../components/Auction/AuctionCard';
const Home = ({ data }) => {
  return (
    <Layout title="Home">
      {/* <div className="flex flex-col justify-center items-center min-h-screen my-auto text-2xl space-y-2">
        Artsy Homepage
      </div> */}
      <div className="">
        <img src={Banner} alt="banner" />
      </div>
      <div className="container mx-auto">
        <div className="flex justify-center items-center py-20">
          <p className="font-semibold   text-2xl lg:text-4xl underline underline-offset-8">
            Latest Auctions
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
          {data?.map((photo) => (
            <AuctionCard key={photo.id} photo={photo} />
          ))}
          {/* <AuctionCard />
          <AuctionCard />
          <AuctionCard />
          <AuctionCard />
          <AuctionCard />
          <AuctionCard /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
