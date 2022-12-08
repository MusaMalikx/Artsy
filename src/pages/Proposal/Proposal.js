import React from 'react'
import Layout from "../../components/Layouts/ArticleLayout";
import ProposalCard from '../../components/Proposal Card/ProposalCard';
export default function Proposal() {
  return (
    <Layout title={"Proposals"}>
    <div className="py-10 px-5">
      <p className="font-semibold font-serif text-2xl lg:text-4xl">Proposals</p>
      <hr />
    </div>
    <div className='border-2 w-10/12 mx-auto p-2 rounded-lg'>
        <ProposalCard />
        <ProposalCard />
        <ProposalCard />
        <ProposalCard />
        <ProposalCard />
    </div>
    
  </Layout>
  )
}
