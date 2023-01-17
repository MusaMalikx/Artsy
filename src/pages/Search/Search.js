import React, { useState } from 'react';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import Layout from '../../components/Layouts/ArticleLayout';
import SearchBar from '../../components/Search/SearchBar';
import AuctionCard from '../../components/Auction/AuctionCard';

const Search = ({ data }) => {
  const [search, setSearch] = useState(false);
  console.log(search);
  return (
    <Layout title="Seacrh">
      <HeaderLayout title="Search" />
      <SearchBar search={setSearch} />
      <div className="min-h-[600px]">
        {search && (
          <div className="container mx-auto grid grid-cols-1 pt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
            {data?.map((photo) => (
              <AuctionCard key={photo.id} artwork={photo} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
