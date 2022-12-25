import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ArtistAuctionList from '../pages/Artist/ArtistAuctionList';
import AuctionItem from '../pages/Auctions/AuctionItem';
import Auctions from '../pages/Auctions/Auctions';
import NewAuction from '../pages/Auctions/NewAuction';
import Chat from '../pages/Chat/Chat';
import ArtistDashboard from '../pages/Dashboard/ArtistDashboard';
import Home from '../pages/Home/Home';
import BuyerProposal from '../pages/Proposal/BuyerProposal';
import Search from '../pages/Search/Search';
import API from '../utils/unsplash';
import SignIn from '../pages/Registration/SignIn';
import SignUp from '../pages/Registration/SignUp';
import ArtistProfileDashboard from '../pages/Dashboard/ArtistProfileDashboard';
import Bids from '../pages/Bids/Bids';
import BuyerCreatedProposal from '../pages/Proposal/BuyerCreatedProposal';
import ArtistProposal from '../pages/Proposal/ArtistProposal';
import BuyerAcceptedProposal from '../pages/Proposal/BuyerAcceptedProposal';
const AppRoutes = () => {
  const [data, setPhotosResponse] = useState(null);
  const [user, setUser] = useState({
    admin: false,
    buyer: true,
    artist: false
  });

  // const [signedIn, setSignIn] = useState(false);

  // const [user, setUser] = useState(null);

  useEffect(() => {
    API.search
      .getPhotos({ query: 'art' })
      .then((res) => {
        setPhotosResponse(res.response.results);
        console.log(res.response.results);
      })
      .catch(() => {
        console.log('something went wrong!');
      });

    // if (user.admin || user.buyer || user.artist) setSignIn(true);
    // else setSignIn(false);
  }, []);

  return (
    <Routes>
      {user.admin || user.buyer || user.artist ? (
        <Route path="/">
          <Route index element={<Home data={data} />} />
          <Route path="artist/dashboard" element={<ArtistDashboard data={data} />} />
          <Route path="artist/auctions" element={<ArtistAuctionList />} />
          <Route path="chat" element={<Chat data={data} />} />
          <Route path="bids" element={<Bids data={data} />} />
          <Route path="search" element={<Search data={data} />} />
          <Route path="auctions" element={<Auctions data={data} />} />
          <Route path="auctions/:id" element={<AuctionItem data={data} />} />
          <Route path="view/buyer/proposal" element={<BuyerProposal />} />
          <Route path="view/artist/proposal" element={<ArtistProposal />} />
          <Route path="view/created/proposal" element={<BuyerCreatedProposal />} />
          <Route path="view/accepted/proposal" element={<BuyerAcceptedProposal />} />
          <Route path="add/artwork" element={<NewAuction />} />
          {/* <Route path="contact" element={<Contact />} />
        <Route path="our-team" element={<OurTeam />}/> */}

          <Route path="profile" element={<ArtistProfileDashboard data={data} />} />
        </Route>
      ) : (
        <Route path="/" element={<Navigate to="/signin" replace />} />
      )}
      <Route path="/">
        <Route path="signin" element={<SignIn user={user} setUser={setUser} />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
