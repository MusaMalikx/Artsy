import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader, Nav, Pagination, TreePicker } from 'rsuite';
import AuctionCard from '../../components/Auction/AuctionCard';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import API from '../../api/server';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import EmptyAuction from '../../components/Animation/EmptyAuctions';
import AuctionCategoriesData from '../../constants/AuctionCategoriesData';
import { useNavigate, useParams } from 'react-router-dom';

/*
Component rendering a list of auctions.
Iterates over the auction data and displays each auction item.
*/
const Auctions = () => {
  const toaster = useToaster();
  const params = useParams();
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [artloader, setArtLoader] = useState(true);
  const [category, setCategory] = useState(null);
  const [totalCount, setTotalCount] = useState();
  const data = useMemo(() => AuctionCategoriesData, []);

  //API to get auctions of a specfic category based on status alongside pagination
  const getCategoryArtworks = useCallback(async () => {
    if (category !== null) {
      setArtLoader(true);
      await API.get(
        `/api/artworks/all/category?category=${category}&status=${params.status}&limit=20&page=${params.page}`
      )
        .then((res) => {
          console.log(res);
          setArtworks(res.data.artworks);
          setTotalCount(res.data.total);
          setArtLoader(false);
          // navigate(`/auctions/${params?.status}/1`);
        })
        .catch((err) => {
          console.log(err);
          Toaster(toaster, 'error', err.response.data.message);
          setArtLoader(false);
        });
    }
  }, [category]);

  //API to get auctions of a specfic category based on status alongside pagination
  const getAllArtworks = useCallback(async () => {
    setArtLoader(true);
    await API.get(`/api/artworks/all?status=${params.status}&limit=20&page=${params.page}`)
      .then((res) => {
        setArtworks(res.data.artworks);
        setTotalCount(res.data.total);
        setArtLoader(false);
      })
      .catch((err) => {
        Toaster(toaster, 'error', err.response.data.message);
        setArtLoader(false);
      });
  }, [params?.status, params?.page]);

  useEffect(() => {
    getAllArtworks();
  }, [getAllArtworks]);

  useEffect(() => {
    getCategoryArtworks();
  }, [getCategoryArtworks]);

  return (
    <Layout title={'Auctions'}>
      <HeaderLayout title={'Auctions'} />
      <div className="container min-h-screen mx-auto">
        <div className="">
          <Nav
            className="text-center"
            justified
            appearance="tabs"
            activeKey={params?.status}
            onSelect={(e) => navigate(`/auctions/${e}/1`)}
            style={{ marginBottom: 50 }}>
            <Nav.Item className="text-center text-lg font-semibold" eventKey="live">
              Live
            </Nav.Item>
            <Nav.Item className="text-center text-lg font-semibold" eventKey="closed">
              Closed
            </Nav.Item>
            <Nav.Item className="text-center text-lg font-semibold" eventKey="coming soon">
              Coming Soon
            </Nav.Item>
          </Nav>
        </div>
        <div className="flex justify-center items-center my-10">
          <TreePicker
            data={data}
            style={{ width: 246 }}
            placeholder="Select Category"
            onChange={setCategory}
            onClean={() => {
              setCategory(null);
              getAllArtworks();
            }}
          />
        </div>
        {artloader ? (
          <div className="flex justify-center items-center">
            <Loader size="lg" />
          </div>
        ) : artworks.length > 0 ? (
          <>
            <div className="flex justify-center flex-wrap gap-5 px-5">
              {artworks.map((artwork) => (
                <AuctionCard updateList={getAllArtworks} key={artwork._id} artwork={artwork} />
              ))}
            </div>
            <div className="mb-20 mt-10 flex justify-center">
              {!category && (
                <Pagination
                  // prev
                  last
                  // next
                  first
                  size="lg"
                  total={totalCount}
                  limit={20}
                  activePage={params?.page}
                  onChangePage={(e) => navigate(`/auctions/${params?.status}/${e}`)}
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                  className=""
                />
              )}
            </div>
          </>
        ) : (
          <EmptyAuction status={params?.status} />
        )}
      </div>
    </Layout>
  );
};

export default Auctions;
