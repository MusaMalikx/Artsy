import React from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ProposalTable from '../../components/Proposal/ArtistAcceptedBids';

/*
Displays the page for viewing accepted bids by an artist.
Allows the artist to see the details of the bids they have accepted.
*/
const ArtistAcceptedBids = () => {
  return (
    <Layout title="Artist">
      <HeaderLayout title="Artist Accepted Bids on Proposals" />
      <div className="w-full min-h-screen">
        <ProposalTable />
      </div>
    </Layout>
  );
};

export default ArtistAcceptedBids;
