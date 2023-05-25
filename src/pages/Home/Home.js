import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import AuctionCard from '../../components/Auction/AuctionCard';
import Carousel from '../../components/Carousel/Carousel';
import displayBanner from '../../assets/images/display.png';
import { Loader } from 'rsuite';
import API from '../../api/server';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import EmptyAuctions from '../../components/Animation/EmptyAuctions';

const Home = () => {
  const [artloader, setArtLoader] = useState(true);
  const toaster = useToaster();
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    getAllArtworks();
  }, []);

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

  //console.log(JSON.parse(localStorage.getItem('auth')).token);
  return (
    <Layout title="Home">
      {/* <div className="flex flex-col justify-center items-center min-h-screen my-auto text-2xl space-y-2">
        Artsy Homepage
      </div> */}
      <div className="">
        <img src={displayBanner} className="max-h-96 w-full" alt="banner" />
      </div>
      <Carousel />
      <div className="container mx-auto">
        <div className="flex justify-center items-center py-20">
          <p className="font-semibold uppercase   text-2xl lg:text-4xl underline underline-offset-8">
            Latest Auctions
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
          {artloader ? (
            <div className="flex justify-center items-center">
              <Loader size="lg" />
            </div>
          ) : artworks.length > 0 ? (
            artworks.map((artwork) => (
              <AuctionCard updateList={getAllArtworks} key={artwork._id} artwork={artwork} />
            ))
          ) : (
            <EmptyAuctions />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
