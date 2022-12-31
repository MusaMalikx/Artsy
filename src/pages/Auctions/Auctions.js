import React from 'react';
import AuctionCard from '../../components/Auction/AuctionCard';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import { Nav } from 'rsuite';
const Navbar = ({ active, onSelect, ...props }) => {
  return (
    <Nav
      className="w-full flex items-center pt-6"
      {...props}
      activeKey={active}
      onSelect={onSelect}
      style={{ marginBottom: 50 }}>
      <p className="text-xl pb-3 ml-6 font-bold text-primary">Categories</p>
      <div className="text-base w-full flex justify-evenly">
        <Nav.Item eventKey="home">Modern</Nav.Item>
        <Nav.Item eventKey="Religious">Religious</Nav.Item>
        <Nav.Item eventKey="Calligraphy">Calligraphy</Nav.Item>
        <Nav.Item eventKey="Cubism">Cubism</Nav.Item>
        <Nav.Item eventKey="Fantasy">Fantasy</Nav.Item>
        <Nav.Item eventKey="Grapfitti">Grapfitti</Nav.Item>
        <Nav.Item eventKey="Sculpture">Sculpture</Nav.Item>
      </div>
    </Nav>
  );
};
const Auctions = ({ data }) => {
  const [active, setActive] = React.useState('home');
  return (
    <Layout title={'Auctions'}>
      <HeaderLayout title={'Auctions'} />
      <Navbar appearance="tabs" active={active} onSelect={setActive} />
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
        {data?.map((photo) => (
          <AuctionCard key={photo.id} photo={photo} />
        ))}
      </div>
    </Layout>
  );
};

export default Auctions;
