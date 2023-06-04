import React from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ProposalTable from '../../components/Proposal/ProposalAcceptedTable';

/*
Component responsible for rendering the page where the buyer can view accepted proposals of artists. 
Handles the logic for displaying the accepted proposal and related information.
*/
const BuyerAcceptedProposal = () => {
  return (
    <Layout title="Listed Auctions">
      <HeaderLayout title="Accepted Proposals" />
      <div className="w-full min-h-screen">
        <ProposalTable />
      </div>
    </Layout>
  );
};

export default BuyerAcceptedProposal;
