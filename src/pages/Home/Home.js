import React from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import AuctionCard from '../../components/Auction/AuctionCard';
import Carousel from '../../components/Carousel/Carousel';
const Home = ({ data }) => {
  // const user = useSelector(selectUser);
  // console.log(user);

  return (
    <Layout title="Home">
      {/* <div className="flex flex-col justify-center items-center min-h-screen my-auto text-2xl space-y-2">
        Artsy Homepage
      </div> */}
      {/* <div className="">
        <img src={Banner} alt="banner" />
      </div> */}
      <Carousel />
      <div className="container mx-auto">
        <div className="flex justify-center items-center py-20">
          <p className="font-semibold uppercase   text-2xl lg:text-4xl underline underline-offset-8">
            Latest Auctions
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
          {data?.map((photo) => (
            <AuctionCard key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
