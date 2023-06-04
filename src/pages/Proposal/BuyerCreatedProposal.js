import React from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ProposalTable from '../../components/Proposal/ProposalListTable';

/*
Component responsible for displaying the buyer created proposal page for on demand auctions.
It handles the rendering and functionality related to proposals created by buyers.
*/
const BuyerCreatedProposal = () => {
  return (
    <Layout title="Listed Auctions">
      <HeaderLayout title="Previously Generated Proposals" />
      <div>
        <ProposalTable />
      </div>
    </Layout>
  );
};

export default BuyerCreatedProposal;
