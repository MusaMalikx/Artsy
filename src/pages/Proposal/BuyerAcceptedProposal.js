import React from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ProposalTable from '../../components/Proposal/ProposalAcceptedTable';

const BuyerAcceptedProposal = () => {
  return (
    <Layout title="Listed Auctions">
      <HeaderLayout title="Accepted Proposals" />
      <div>
        <ProposalTable />
      </div>
    </Layout>
  );
};

export default BuyerAcceptedProposal;
