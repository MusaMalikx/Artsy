import React from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ProposalTable from '../../components/Proposal/ProposalListTable';

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
