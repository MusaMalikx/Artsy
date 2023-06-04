import React from 'react';
import AuctionTable from '../../components/Auction/AuctionTable';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';

/*
This React component, ArtistAuctionList, renders a list of auctions specifically related to artists. 
It provides a user-friendly interface for browsing and accessing auction information for various artists. 
*/
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
