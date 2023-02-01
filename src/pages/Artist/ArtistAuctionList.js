import React from 'react';
import AuctionTable from '../../components/Auction/AuctionTable';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';

const ArtistAuctionList = () => {
  return (
    <Layout title="Listed Auctions">
      <HeaderLayout title="Artist Listed Auctions" />
      <div className="min-h-[600px]">
        <AuctionTable />
      </div>
    </Layout>
  );
};

export default ArtistAuctionList;
