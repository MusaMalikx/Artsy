import React, { useEffect, useMemo, useState } from 'react';
import { Loader, TreePicker, useToaster } from 'rsuite';
import API from '../../api/server';
import EmptyAuctions from '../../components/Animation/EmptyAuctions';
import AuctionCard from '../../components/Auction/AuctionCard';
import Toaster from '../../components/Common/Toaster';
import AdminLayout from '../../components/Layouts/AdminLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import AuctionCategoriesData from '../../constants/AuctionCategoriesData';

const AuctionsList = () => {
  const toaster = useToaster();
  const [loader, setLoader] = useState(true);
  const data = useMemo(() => AuctionCategoriesData, []);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    getAllArtworks();
  }, []);

  const getCategoryArtworks = async (value) => {
    if (value !== null) {
      const selectedCategory = value;
      await API.get(`/api/artworks/all/category?category=${selectedCategory}`)
        .then((res) => {
          setArtworks(res.data);
        })
        .catch((err) => {
          console.log(err);
          Toaster(toaster, 'error', err.response.data.message);
        });
    }
  };

  const getAllArtworks = async () => {
    await API.get('/api/artworks/all')
      .then((res) => {
        setArtworks(res.data);
        console.log(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        Toaster(toaster, 'error', err.response.data.message);
        setLoader(false);
      });
  };

  return (
    <AdminLayout title="Auctions" bool>
      <HeaderLayout title="Listed Auctions" />
      <div className="container mx-auto">
        <div className="flex justify-center items-center my-10">
          <TreePicker
            data={data}
            style={{ width: 246 }}
            placeholder="Select Category"
            onChange={getCategoryArtworks}
            onClean={getAllArtworks}
          />
        </div>
        {loader ? (
          <Loader />
        ) : artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
            {artworks.map((artwork) => (
              <AuctionCard updateList={getAllArtworks} key={artwork._id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <EmptyAuctions />
        )}
      </div>
    </AdminLayout>
  );
};

export default AuctionsList;
