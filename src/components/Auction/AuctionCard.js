import React from 'react';
import { RiAuctionLine } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/reducer/userReducer';
import AuctionCardTimer from '../Common/Timer/AuctionCardTimer';

const AuctionCard = ({ artwork, updateList }) => {
  // const { user, urls } = photo;
  const navigate = useNavigate();
  const usr = useSelector(selectUser);

  const handleClick = () => {
    if (usr.admin) {
      navigate(`/admin/view/auctions/${artwork.id}`, {
        state: { user: artwork.user, urls: artwork.urls }
      });
    } else {
      navigate(`/auctions/${artwork.id}`, { state: { user: artwork.user, urls: artwork.urls } });
    }
  };

  const handleClickrealauctions = () => {
    navigate(`/auctions/${artwork._id}`, { state: { artwork } });
  };

  return (
    <>
      {artwork.urls ? (
        <div
          className="mx-auto hover:scale-90 transition-all p-5 mb-10 border hover:border-gray-900 rounded-md"
          onClick={handleClick}>
          <div className="flex space-x-4">
            <div className="space-y-2">
              <RiAuctionLine
                size={37}
                className="border rounded-md p-2 cursor-pointer bg-primary"
                color="white"
              />
              <AiOutlineHeart size={37} className="border rounded-md p-2 cursor-pointer" />
              <BiSearch size={37} className="border rounded-md p-2 cursor-pointer" />
            </div>
            <div>
              <img
                className="w-40 h-32 rounded-md cursor-pointer"
                // src='https://www.loonapix.com/img/filter/list/1562708307.jpg'
                src={artwork.urls.thumb}
                alt={artwork.user.username}
              />
            </div>
          </div>
          <div className="flex flex-col my-5 border rounded-md uppercase">
            <p className="text-gray-500 text-center font-semibold mt-2">Time left</p>
            <div className="flex items-center justify-around">
              <div className="w-[1px] h-10 border" />
              <div className="my-3 flex flex-col items-center">
                <span className="font-bold text-lg">97</span>
                <span className="mb-1 text-[8px]">Days</span>
              </div>
              <div className="w-[1px] h-10 border" />
              <div className="my-3 flex flex-col items-center">
                <span className="font-bold text-lg">97</span>
                <span className="mb-1 text-[8px]">Hours</span>
              </div>
              <div className="w-[1px] h-10 border" />
              <div className="my-3 flex flex-col items-center">
                <span className="font-bold text-lg">97</span>
                <span className="mb-1 text-[8px]">Minutes</span>
              </div>
              <div className="w-[1px] h-10 border" />
              <div className="my-3 flex flex-col items-center">
                <span className="font-bold text-lg">97</span>
                <span className="mb-1 text-[8px]">Seconds</span>
              </div>
              <div className="w-[1px] h-10 border" />
            </div>
          </div>
          <hr />
          <div className="uppercase">
            <p className="font-extrabold text-black text-xl text-center">Le bouquet de Paris</p>
            <p className="text-center">
              current Bid: <span className="font-bold">PKR 51</span>
            </p>
          </div>
        </div>
      ) : (
        <div
          className="mx-auto hover:scale-90 transition-all p-5 mb-10 border hover:border-gray-900 rounded-md"
          onClick={handleClickrealauctions}>
          <div className="flex space-x-4">
            <div className="space-y-2">
              <RiAuctionLine
                size={37}
                className="border rounded-md p-2 cursor-pointer bg-primary"
                color="white"
              />
              <AiOutlineHeart size={37} className="border rounded-md p-2 cursor-pointer" />
              <BiSearch size={37} className="border rounded-md p-2 cursor-pointer" />
            </div>
            <div>
              <img
                className="w-40 h-32 rounded-md cursor-pointer"
                // src='https://www.loonapix.com/img/filter/list/1562708307.jpg'
                src={`http://localhost:8080/api/artworks/image?filename=${artwork.images[0]}`}
                alt={artwork.title}
              />
            </div>
          </div>
          <AuctionCardTimer
            updateList={updateList}
            endDate={artwork.enddate}
            startDate={artwork.startdate}
            artwork={artwork}
          />
          <hr />
          <div className="uppercase">
            <p className="font-extrabold text-black text-xl text-center">{artwork.title}</p>
            <p className="text-center">
              current Bid: <span className="font-bold">PKR {artwork.currentbid}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AuctionCard;
