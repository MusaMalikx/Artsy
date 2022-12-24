import React from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ArtistProposalCard from '../../components/Proposal/ArtistProposal';
export default function ArtistProposal() {
  return (
    <Layout title={'Proposals'}>
      <HeaderLayout title="Artists Generated Proposals" />
      <div className=" mb-14 w-10/12 mx-auto rounded-lg">
        <ArtistProposalCard />
        <ArtistProposalCard />
        <ArtistProposalCard />
        <ArtistProposalCard />
        <ArtistProposalCard />
      </div>
    </Layout>
  );
}
