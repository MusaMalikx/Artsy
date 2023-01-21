import React, { useEffect, useState } from 'react';
import { SelectPicker } from 'rsuite';
import AuctionCard from '../../components/Auction/AuctionCard';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import API from '../../api/server';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';

const Auctions = () => {
  const toaster = useToaster();
  const dat = [
    'Modern',
    'Religious',
    'Calligraphy',
    'Cubism',
    'Fantasy',
    'Grapfitti',
    'Sculpture'
  ].map((item) => ({ label: item, value: item }));
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    API.get('/api/artworks/all')
      .then((res) => {
        setArtworks(res.data);
      })
      .catch((err) => {
        console.log(err);
        Toaster(toaster, 'error', err.response.data.message);
      });
  }, []);

  return (
    <Layout title={'Auctions'}>
      <HeaderLayout title={'Auctions'} />
      <div className="container mx-auto">
        <div className="flex justify-center items-center my-10">
          <SelectPicker
            data={dat}
            searchable={false}
            placeholder="Select Category"
            style={{ width: 224 }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
          {/* {data?.map((photo) => (
            <AuctionCard key={photo.id} photo={photo} />
          ))} */}
          {artworks?.map((artwork) => (
            <AuctionCard key={artwork._id} artwork={artwork} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Auctions;
