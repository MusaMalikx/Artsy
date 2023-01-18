import React from 'react';
import { SelectPicker } from 'rsuite';
import AuctionCard from '../../components/Auction/AuctionCard';
import AdminLayout from '../../components/Layouts/AdminLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';

const AuctionsList = ({ data }) => {
  const dat = [
    'Modern',
    'Religious',
    'Calligraphy',
    'Cubism',
    'Fantasy',
    'Grapfitti',
    'Sculpture'
  ].map((item) => ({ label: item, value: item }));
  return (
    <AdminLayout title="Auctions">
      <HeaderLayout title="Listed Auctions" />
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
          {data?.map((photo) => (
            <AuctionCard key={photo.id} artwork={photo} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuctionsList;
