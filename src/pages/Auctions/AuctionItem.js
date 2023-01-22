import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AuctionCard from '../../components/Auction/AuctionCard';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import AutomateBid from '../../components/Modals/AutomateBid';
import { selectUser } from '../../redux/features/userReducer';
import API from '../../api/server';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';

const AuctionItem = ({ data }) => {
  const { state } = useLocation();
  // const { user, urls } = state;
  const us = useSelector(selectUser);
  const [openAutoBid, setOpenAutoBid] = useState(false);
  const [auth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [artistname, setArtistname] = useState('');
  const [timer, setTimer] = useState('00:00:00');
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
  const artId = location.pathname.split('/')[2];
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
    }
  }, []);

  useEffect(() => {
    const generateTime = () => {
      const date1 = new Date(state.artwork.enddate);
      const date2 = new Date();
      if (date1 - date2 > 0) {
        const diffInSeconds = Math.abs(date1 - date2) / 1000;
        let days = Math.floor(diffInSeconds / 60 / 60 / 24);
        let hours = Math.floor((diffInSeconds / 60 / 60) % 24);
        let minutes = Math.floor((diffInSeconds / 60) % 60);
        let seconds = Math.floor(diffInSeconds % 60);
        days = days.toString().length == 1 ? `0${days}` : days;
        hours = hours.toString().length == 1 ? `0${hours}` : hours;
        minutes = minutes.toString().length == 1 ? `0${minutes}` : minutes;
        seconds = seconds.toString().length == 1 ? `0${seconds}` : seconds;
        setTimer(`${days}:${hours}:${minutes}:${seconds}`);
      } else {
        setTimer('Auction Closed');
      }
    };
    generateTime();
  }, [timer]);

  return (
    <Layout title={'Auctions'}>
      <HeaderLayout title="Auction Item" />
      {state.user ? (
        //if unsplash data was used
        <div className="py-10 px-5">
          <div className="flex flex-col lg:flex-row mt-20">
            <img
              src={state.urls.full}
              className="w-96 h-96 rounded-md mx-auto"
              alt={state.user.username}
            />
            <div className="flex-grow mx-10 flex flex-col justify-between my-10 lg:my-0 space-y-3 lg:space-y-0">
              <div className="flex flex-wrap items-center w-full justify-between">
                <p className="font-mono mr-auto text-gray-600 text-4xl font-bold uppercase">
                  {state.user.name}
                </p>
                <p className="text-xl font-mono text-green-600">{timer}</p>
              </div>
              <p className="text-base ">
                Made by <span className="font-bold underline cursor-pointer">Chris Johnson</span>{' '}
              </p>
              <p className="text-lg font-semibold">{state.user.bio}</p>
              <p className=" font-sans">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                piece of classical Latin literature from 45 BC, making it over 2000 years old.
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked
                up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and
                going through the cites of the word in classical literature, discovered the
                undoubtable source.
              </p>
              <div className="flex text-lg">
                <p className="mr-1 font-mono">Highest Bid:</p>
                <div className="font-bold text-green-800">
                  <span className="mr-0.5">PKR</span>
                  <span>51</span>
                </div>
              </div>
              <div className="flex text-lg">
                <p className="mr-1 font-mono">Highest Bidder:</p>
                <div className="font-bold text-green-800">
                  <span className="mr-0.5">Muhammad Ahmed</span>
                </div>
              </div>
              {us.buyer && (
                <>
                  <div>
                    <input
                      className="border text-xl w-4/12 px-10 py-2 rounded-xl outline-gray-400 px-auto"
                      min={0}
                      type="number"
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <button className="bg-primary  focus:outline-none active:bg-cyan-800 text-white w-fit px-10 rounded-2xl py-1.5 font-extrabold">
                      Place Bid
                    </button>
                    <p className="font-bold">OR</p>
                    <button
                      onClick={placeAutoBid}
                      className="bg-primary focus:outline-none active:bg-cyan-800 text-white w-fit px-10 rounded-2xl py-1.5 font-extrabold">
                      Automated Bid
                    </button>
                    {<AutomateBid open={openAutoBid} setOpen={setOpenAutoBid} />}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        // If real data was used
        <div className="py-10 px-5">
          <div className="flex flex-col lg:flex-row mt-20">
            <img
              src={`http://localhost:8080/api/artworks/image?filename=${state.artwork.images[0]}`}
              className="w-96 h-96 rounded-md mx-auto"
              alt={state.artwork.title}
            />
            <div className="flex-grow mx-10 flex flex-col justify-between my-10 lg:my-0 space-y-3 lg:space-y-0">
              <div className="flex flex-wrap items-center w-full justify-between">
                <p className="font-mono mr-auto text-gray-600 text-4xl font-bold uppercase">
                  {state.artwork.title}
                </p>
                <p className="text-xl font-mono text-green-600">{timer}</p>
              </div>
              <p className="text-base ">
                Made by{' '}
                <span
                  onClick={() => {
                    navigate(`/artist/profile/${state.artwork.artistId}`);
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
              {us.buyer && (
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
      )}

      <div className="mx-5 py-10 bg-gray-100 border border-gray-400 rounded-lg mb-20 md:my-20">
        <div className="flex justify-center items-center mb-10">
          <p className="font-semibold   text-2xl">Similar Auctions Items</p>
        </div>
        <div className="flex items-center flex-wrap justifayy-center ">
          {data?.slice(4, 9).map((photo) => (
            <AuctionCard key={photo.id} artwork={photo} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AuctionItem;
