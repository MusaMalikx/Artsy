import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../../api/server';
import EmptyProposal from '../../components/Animation/EmptyProposal';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ArtistProposalCard from '../../components/Proposal/ArtistProposal';
export default function ArtistProposal() {
  const location = useLocation();
  const proposalId = location.pathname.split('/')[4];
  const [proposalList, setProposalList] = useState([]);
  const getArtistProposals = async () => {
    const res = await API.get(`/api/users/proposal/artistbid/${proposalId}`);
    if (res.data) {
      setProposalList(res.data);
    }
  };
  useEffect(() => {
    getArtistProposals();
  }, []);
  return (
    <Layout title={'Proposals'}>
      <HeaderLayout title="Artists Generated Proposals" />
      <div className=" mb-14 min-h-screen w-10/12 mx-auto rounded-lg">
        {proposalList.length > 0 ? (
          proposalList.map((proposal) => {
            return <ArtistProposalCard proposalInfo={proposal} key={proposal.artistId} />;
          })
        ) : (
          <EmptyProposal />
        )}
      </div>
    </Layout>
  );
}
