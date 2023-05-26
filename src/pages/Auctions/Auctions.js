import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader, Nav, TreePicker } from 'rsuite';
import AuctionCard from '../../components/Auction/AuctionCard';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import API from '../../api/server';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import EmptyAuction from '../../components/Animation/EmptyAuctions';
import AuctionCategoriesData from '../../constants/AuctionCategoriesData';
import ReactPaginate from 'react-paginate';

const Auctions = () => {
  const toaster = useToaster();
  const [artworks, setArtworks] = useState([]);
  const [artloader, setArtLoader] = useState(true);
  const [active, setActive] = useState('live');
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // console.log(activePage, totalPages);
  // console.log(active);
  const data = useMemo(() => AuctionCategoriesData, []);

  const getCategoryArtworks = async (value) => {
    // console.log(value);
    if (value !== null) {
      setArtLoader(true);
      const selectedCategory = value;
      await API.get(
        `/api/artworks/all/category?category=${selectedCategory}&status=${active}&limit=20&page=${activePage}`
      )
        .then((res) => {
          setArtworks(res.data.artworks);
          setTotalPages(res.data.total);
          setArtLoader(false);
        })
        .catch((err) => {
          console.log(err);
          Toaster(toaster, 'error', err.response.data.message);
          setArtLoader(false);
        });
    }
  };

  const getAllArtworks = useCallback(async () => {
    setArtLoader(true);
    await API.get(`/api/artworks/all?status=${active}&limit=20&page=${activePage}`)
      .then((res) => {
        setArtworks(res.data.artworks);
        setTotalPages(res.data.total);
        console.log(res.data);
        setArtLoader(false);
      })
      .catch((err) => {
        // console.log(err);
        Toaster(toaster, 'error', err.response.data.message);
        setArtLoader(false);
      });
  }, [active, activePage]);

  useEffect(() => {
    getAllArtworks();
  }, [getAllArtworks]);

  return (
    <Layout title={'Auctions'}>
      <HeaderLayout title={'Auctions'} />
      <div className="container min-h-screen mx-auto">
        <div className="">
          <Nav
            className="text-center"
            justified
            appearance="tabs"
            activeKey={active}
            onSelect={setActive}
            style={{ marginBottom: 50 }}>
            <Nav.Item className="text-center text-lg font-semibold" eventKey="live">
              Live
            </Nav.Item>
            <Nav.Item className="text-center text-lg font-semibold" eventKey="closed">
              Closed
            </Nav.Item>
            <Nav.Item className="text-center text-lg font-semibold" eventKey="upcoming">
              Upcoming
            </Nav.Item>
          </Nav>
        </div>
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
              {artworks.map((artwork) => (
                <AuctionCard updateList={getAllArtworks} key={artwork._id} artwork={artwork} />
              ))}
            </div>
            <div className="mb-20 mt-10">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={(e) => setActivePage(e.selected + 1)}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                className="flex space-x-4 items-center justify-center text-lg"
              />
            </div>
          </>
        ) : (
          <EmptyAuction />
        )}
      </div>
    </Layout>
  );
};

export default Auctions;
