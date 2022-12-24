import React from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ProposalCard from '../../components/Proposal/BuyerProposalCard';
export default function BuyerProposal() {
  return (
    <Layout title={'Proposals'}>
      <HeaderLayout title="Buyers Generated Proposals" />
      <div className=" mb-14 w-10/12 mx-auto rounded-lg">
        <ProposalCard />
        <ProposalCard />
        <ProposalCard />
        <ProposalCard />
        <ProposalCard />
      </div>
    </Layout>
  );
}
