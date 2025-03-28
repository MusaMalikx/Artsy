import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToaster } from 'rsuite';
import API from '../../api/server';
import AuctionItemCarousel from '../../components/Carousel/AuctionItemCarousel';
import AuctionItemTimer from '../../components/Common/Timer/AuctionItemTimer';
import Toaster from '../../components/Common/Toaster';
import AdminLayout from '../../components/Layouts/AdminLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import AutomateBid from '../../components/Modals/AutomateBid';
import { selectUser } from '../../redux/features/reducer/userReducer';
import AuctionCard from '../../components/Auction/AuctionCard';

const AuctionListItem = () => {
  const { state } = useLocation();
  const us = useSelector(selectUser);
  const [openAutoBid, setOpenAutoBid] = useState(false);
  const [auth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [artistname, setArtistname] = useState('');

  const bid = useRef();
  const [disableManualBid, setDisableManualBid] = useState(false);
  const [bidInfo, setBidInfo] = useState({
    currentBid: 0,
    basePrice: 0,
    currentBidder: '',
    buyerInfo: {}
  });
  const toaster = useToaster();
  const navigate = useNavigate();
  const location = useLocation();
  const artId = location.pathname.split('/')[6];
  const [recommendations, setRecommendations] = useState();
  let artworkObj;
  if (state.artwork) {
    artworkObj = {
      id: state.artwork._id,
      status: state.artwork.status,
      title: state.artwork.title
    };
  }

  const placeAutoBid = (e) => {
    e.preventDefault();
    setOpenAutoBid(true);
  };

  const getHighBidInfo = async () => {
    const res = await API.get(`/api/artworks/bidinfo/${artId}`, {
      headers: {
        token: 'Bearer ' + auth.token
      }
    });
    if (res.data) {
      setBidInfo({
        currentBid: res.data.currentBid,
        basePrice: res.data.basePrice,
        currentBidder: res.data.currentBidder,
        buyerInfo: res.data.buyerInfo
      });
      res.data.buyerInfo.autoBid ? setDisableManualBid(res.data.buyerInfo.autoBid.status) : '';
    }
  };

  const placeManualBid = async (e) => {
    if (state.artwork) {
      const newBid = parseFloat(bid.current.value);
      const minBid =
        parseFloat(bidInfo.currentBid) > parseFloat(bidInfo.basePrice)
          ? parseFloat(bidInfo.currentBid) + 1
          : parseFloat(bidInfo.basePrice) + 1;
      if (newBid >= minBid) {
        e.preventDefault();
        try {
          const res = await API.post(
            `/api/users/bid/${state.artwork._id}`,
            {
              bid: newBid
            },
            {
              headers: {
                token: 'Bearer ' + auth.token
              }
            }
          );
          if (res) {
            Toaster(toaster, 'success', 'Bid placed successfully!');
            bid.current.value = '';
            getHighBidInfo();
          }
        } catch (error) {
          Toaster(toaster, 'error', 'Failed to place a bid!');
        }
      } else {
        bid.current.setCustomValidity('Invalid bid. Increase the bid amount!');
      }
    }
  };

  const getRecommendations = async () => {
    try {
      const res = await API.get(`/api/artworks/recommend?artistId=${state.artwork.artistId}`);
      // console.log(res);
      setRecommendations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state.artwork) {
      API.get(`/api/artworks/madeby?id=${state.artwork.artistId}`)
        .then((res) => {
          setArtistname(res.data);
        })
        .catch((err) => {
          console.log(err);
          Toaster(toaster, 'error', err.response.data.message);
        });
      getHighBidInfo();
      getRecommendations();
    }
  }, []);

  return (
    <AdminLayout title={'Auctions'} bool>
      <HeaderLayout title="Auction Item" />

      <div className="py-10 px-5">
        <div className="flex flex-col lg:flex-row mt-20">
          <AuctionItemCarousel images={state.artwork.images} />
          <div className="flex-grow mx-10 flex flex-col justify-between my-10 lg:my-0 space-y-3 lg:space-y-0">
            <div className="flex flex-wrap items-center w-full justify-between">
              <p className="font-mono mr-auto text-gray-600 text-4xl font-bold uppercase">
                {state.artwork.title}
              </p>
              <p className="text-xl font-mono text-green-600">
                <AuctionItemTimer
                  endDate={state.artwork.enddate}
                  startDate={state.artwork.startdate}
                  artwork={artworkObj}
                />
              </p>
            </div>
            <p className="text-base ">
              Made by{' '}
              <span
                onClick={() => {
                  navigate(`/admin/artist/profile/${state.artwork.artistId}`);
                }}
                className="font-bold uppercase hover:text-black underline cursor-pointer">
                {artistname ? artistname : 'Not Found'}
              </span>{' '}
            </p>
            <p className="text-lg font-semibold">{state.artwork.category}</p>
            <p className=" font-sans">{state.artwork.description}</p>
            <div className="flex text-lg">
              <p className="mr-1 font-mono">Starting Bid:</p>
              <div className="font-bold text-yellow-800">
                <span className="mr-0.5">PKR</span>
                <span>{bidInfo.basePrice}</span>
              </div>
            </div>
            <div className="flex text-lg">
              <p className="mr-1 font-mono">Highest Bid:</p>
              <div className="font-bold text-green-800">
                <span className="mr-0.5">PKR</span>
                <span>{bidInfo.currentBid}</span>
              </div>
            </div>
            <div className="flex text-lg">
              <p className="mr-1 font-mono">Highest Bidder:</p>
              <div className="font-bold text-green-800">
                <span className="mr-0.5">
                  {bidInfo.currentBidder ? bidInfo.currentBidder : 'None'}
                </span>
              </div>
            </div>
            {us.buyer && state.artwork.status !== 'closed' && (
              <>
                <form>
                  <div className="mb-4">
                    <input
                      className="text-xl w-96 py-2 outline-gray-400 px-auto rounded border focus:ring-0 focus:border-primary focus:border-2"
                      ref={bid}
                      min={
                        bidInfo.currentBid > bidInfo.basePrice
                          ? bidInfo.currentBid + 1
                          : bidInfo.basePrice + 1
                      }
                      type="number"
                      // value={quantity}
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <button
                      type="submit"
                      onClick={placeManualBid}
                      disabled={disableManualBid}
                      className={`${
                        disableManualBid ? 'opacity-50' : 'active:bg-cyan-800'
                      } bg-primary focus:outline-none text-white w-fit px-10 rounded-2xl py-1.5 font-extrabold`}>
                      Place Bid
                    </button>
                    <p className="font-bold">OR</p>
                    <button
                      onClick={placeAutoBid}
                      className="bg-primary focus:outline-none active:bg-cyan-800 text-white w-fit px-10 rounded-2xl py-1.5 font-extrabold">
                      Automated Bid
                    </button>
                    {
                      <AutomateBid
                        open={openAutoBid}
                        setOpen={setOpenAutoBid}
                        bidInfo={bidInfo}
                        artId={artId}
                        setBidInfo={() => {
                          getHighBidInfo();
                        }}
                      />
                    }
                  </div>
                  {disableManualBid ? (
                    <p className="mt-2 text-sm text-red-400">*Automated Bid Feature is Enabled</p>
                  ) : (
                    ''
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-5 p-10 border-gray-400 border space-x-3 rounded-lg mb-20 md:my-20">
        <div className="flex justify-center items-center mb-20">
          <h2 className="font-semibold uppercase text-3xl">Similar Auctions Items</h2>
        </div>
        <div className="flex overflow-x-scroll">
          {recommendations?.length > 0 ? (
            recommendations?.map(
              (recommend, i) =>
                recommend.artwork?.length > 0 && (
                  <div key={i} className="border-l-2 border-dashed pl-4">
                    <h5>By {recommend.name}</h5>
                    {/* <ThumnailCarousel data={recommend.artwork} /> */}
                    <div className="flex space-x-3">
                      {recommend.artwork.map((artwork) => (
                        <div key={artwork?._id} className="">
                          <AuctionCard artwork={artwork} />
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )
          ) : (
            <h3>No Auctions Recommended</h3>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuctionListItem;
