import { RiAuctionLine } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/reducer/userReducer';
import AuctionCardTimer from '../Common/Timer/AuctionCardTimer';

/*
This component renders a card for displaying auction listings
*/
const AuctionCard = ({ artwork, updateList }) => {
  const navigate = useNavigate();
  const usr = useSelector(selectUser);
  const params = useParams();
  const handleClick = () => {
    if (usr.admin) {
      navigate(`/admin/view/auctions/${params.page}/${artwork.id}`, {
        state: { user: artwork.user, urls: artwork.urls }
      });
    } else {
      navigate(`/auctions/${params.page}/${artwork.id}`, {
        state: { user: artwork.user, urls: artwork.urls }
      });
    }
  };

  const handleClickrealauctions = () => {
    if (usr.admin)
      navigate(`/admin/view/auctions/${params?.status}/${params.page}/${artwork._id}`, {
        state: { artwork }
      });
    else
      navigate(`/auctions/${params?.status}/${params.page}/${artwork._id}`, { state: { artwork } });
  };

  return (
    <div className="pt-5">
      {artwork.urls ? (
        <div
          className="mx-auto hover:scale-95 w-64 hover:shadow-all transition-all p-5 mb-10 border rounded-md"
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
          className="hover:scale-95 w-64 mx-3 hover:shadow-all transition-all p-5 border rounded-md"
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
                src={artwork.images[0]}
                alt={artwork.title}
              />
            </div>
          </div>
          {artwork?.status === 'closed' ? (
            <div className="mt-10 flex justify-center uppercase tracking-widest text-red-400 font-extrabold">
              Auction Closed
            </div>
          ) : artwork?.status === 'comming soon' ? (
            <div className="mt-10 flex justify-center uppercase tracking-widest text-emerald-400 font-extrabold">
              Coming Soon
            </div>
          ) : (
            artwork?.status === 'live' && (
              <AuctionCardTimer
                updateList={updateList}
                endDate={artwork.enddate}
                startDate={artwork.startdate}
                artwork={artwork}
              />
            )
          )}
          <hr />
          <div className="uppercase">
            <p className="font-semibold tracking-wide text-black text-xl text-center w-full text-ellipsis d-block overflow-hidden whitespace-nowrap">
              {artwork.title}
            </p>
            <p className="text-center">
              {artwork?.status === 'closed'
                ? 'Closing Bid: '
                : artwork?.status === 'upcoming'
                  ? 'Upcoming Bid Base: '
                  : artwork?.status === 'live' && 'Current Bid: '}
              <span className="font-bold">PKR {artwork.currentbid}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionCard;
