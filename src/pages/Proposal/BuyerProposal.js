import React, { useEffect, useState } from 'react';
import API from '../../api/server';
import EmptyProposal from '../../components/Animation/EmptyProposal';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ProposalCard from '../../components/Proposal/BuyerProposalCard';
export default function BuyerProposal() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [proposalList, setProposalList] = useState([]);
  const getProposals = async () => {
    const res = await API.get('/api/artists/proposal', {
      headers: {
        token: 'Bearer ' + auth.token
      }
    });
    if (res.data) {
      setProposalList(res.data);
    }
  };
  useEffect(() => {
    getProposals();
  }, []);
  return (
    <Layout title={'Proposals'}>
      <HeaderLayout title="Buyers Generated Proposals" />
      <div className=" mb-14 w-10/12 mx-auto min-h-screen rounded-lg">
        {proposalList.length > 0 ? (
          proposalList.map((p) => {
            return <ProposalCard key={p._id} proposal={p} updateProposals={getProposals} />;
          })
        ) : (
          <EmptyProposal />
        )}
      </div>
    </Layout>
  );
}
