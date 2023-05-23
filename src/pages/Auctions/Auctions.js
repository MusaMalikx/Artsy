import React, { useEffect, useMemo, useState } from 'react';
import { Loader, TreePicker } from 'rsuite';
import AuctionCard from '../../components/Auction/AuctionCard';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import API from '../../api/server';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import EmptyAuction from '../../components/Animation/EmptyAuctions';
import AuctionCategoriesData from '../../constants/AuctionCategoriesData';

const Auctions = () => {
  const toaster = useToaster();
  const [artworks, setArtworks] = useState([]);
  const [artloader, setArtLoader] = useState(true);
  const data = useMemo(() => AuctionCategoriesData, []);

  useEffect(() => {
    getAllArtworks();
  }, []);

  const getCategoryArtworks = async (value) => {
    // console.log(value);
    if (value !== null) {
      setArtLoader(true);
      const selectedCategory = value;
      await API.get(`/api/artworks/all/category?category=${selectedCategory}`)
        .then((res) => {
          setArtworks(res.data);
          setArtLoader(false);
        })
        .catch((err) => {
          console.log(err);
          Toaster(toaster, 'error', err.response.data.message);
          setArtLoader(false);
        });
    }
  };

  const getAllArtworks = async () => {
    setArtLoader(true);
    await API.get('/api/artworks/all')
      .then((res) => {
        setArtworks(res.data);
        console.log(res.data);
        setArtLoader(false);
      })
      .catch((err) => {
        console.log(err);
        Toaster(toaster, 'error', err.response.data.message);
        setArtLoader(false);
      });
  };

  return (
    <Layout title={'Auctions'}>
      <HeaderLayout title={'Auctions'} />
      <div className="container min-h-screen mx-auto">
        <div className="flex justify-center items-center my-10">
          <TreePicker
            data={data}
            style={{ width: 246 }}
            placeholder="Select Category"
            onChange={getCategoryArtworks}
            onClean={getAllArtworks}
          />
        </div>
        {artloader ? (
          <div className="flex justify-center items-center">
            <Loader size="lg" />
          </div>
        ) : artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
            {artworks.map((artwork) => (
              <AuctionCard updateList={getAllArtworks} key={artwork._id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <EmptyAuction />
        )}
      </div>
    </Layout>
  );
};

export default Auctions;
