import React, { useState } from 'react';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import Layout from '../../components/Layouts/ArticleLayout';
import SearchBar from '../../components/Search/SearchBar';
import AuctionCard from '../../components/Auction/AuctionCard';

const Search = () => {
  const [artworks, setArtworks] = useState([]);
  console.log(artworks);
  return (
    <Layout title="Seacrh">
      <HeaderLayout title="Search" />
      <SearchBar artwork={setArtworks} />
      <div className="min-h-[600px]">
        {artworks && (
          <div className="container mx-auto grid grid-cols-1 pt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
            {artworks?.map((artwork) => (
              <AuctionCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
