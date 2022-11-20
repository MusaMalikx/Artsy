import React from "react";
import AuctionCard from "../../components/Auction/AuctionCard";
import Layout from "../../components/Layouts/ArticleLayout";

const Auctions = ({ data }) => {
  return (
    <Layout title={"Auctions"}>
      <div className="py-10 px-5">
        <p className="font-semibold font-serif text-2xl lg:text-4xl">Auctions</p>
        <hr />
      </div>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
        {data?.map((photo) => (
          <AuctionCard key={photo.id} photo={photo} />
        ))}
      </div>
    </Layout>
  );
};

export default Auctions;
