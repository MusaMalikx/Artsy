import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ArtistAuctionList from '../pages/Artist/ArtistAuctionList';
import AuctionItem from '../pages/Auctions/AuctionItem';
import Auctions from '../pages/Auctions/Auctions';
import NewAuction from '../pages/Auctions/NewAuction';
import Chat from '../pages/Chat/Chat';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
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
import BuyerProfileDashboard from '../pages/Dashboard/BuyerProfileDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, selectUser, setUser } from '../redux/features/reducer/userReducer';
import Reports from '../pages/Admin/Reports';
import AuctionsList from '../pages/Admin/AuctionsList';
import AuctionListItem from '../pages/Admin/AuctionListItem';
import AdminChat from '../pages/Admin/AdminChat';
import AdminUsers from '../pages/Admin/AdminUsers';
import AdminSignIn from '../pages/Registration/AdminSignIn';
const AppRoutes = () => {
  const [data, setPhotosResponse] = useState(null);
  // console.log('auth', JSON.parse(localStorage.getItem('auth')));
  const [auth] = useState(JSON.parse(localStorage.getItem('auth')));
  // console.log(auth);

  // console.log('user', auth.user);
  // const us = Object.assign(auth.user, { artist: false });
  // console.log('us', us);
  // const [user, setUser] = useState({
  //   admin: false,
  //   buyer: false,
  //   artist: false
  // });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const signedIn = useSelector(selectSignedIn);
  // console.log(user);
  // const signedIn = useState(false)

  // const [signedIn, setSignedIn] = useState(false);

  // const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth?.type === 'buyer') {
      dispatch(setUser({ buyer: true }));
      navigate('/');
    } else if (auth?.type === 'artist') {
      dispatch(setUser({ artist: true }));
      navigate('/');
    }
  }, [dispatch]);

  useEffect(() => {
    API.search
      .getPhotos({ query: 'art' })
      .then((res) => {
        setPhotosResponse(res.response.results);
        // console.log(res.response.results);
      })
      .catch(() => {
        console.log('something went wrong!');
      });
    // if (user.admin || user.buyer || user.artist) setSignIn(true);
    // else setSignIn(false);
  }, []);

  return (
    <Routes>
      {signedIn ? (
        <Route path="/">
          <Route index element={<Home data={data} />} />
          {user.admin && (
            <>
              <Route path="admin/dashboard" element={<AdminDashboard data={data} />} />
              <Route path="admin/chat" element={<AdminChat data={data} />} />
              <Route path="admin/users" element={<AdminUsers data={data} />} />
              <Route path="admin/view/reports" element={<Reports />} />
              <Route path="admin/view/auctions" element={<AuctionsList data={data} />} />
              <Route path="admin/view/auctions/:id" element={<AuctionListItem data={data} />} />
            </>
          )}
          {(user.artist || user.buyer) && (
            <>
              <Route path="chat" element={<Chat data={data} />} />
              <Route path="search" element={<Search data={data} />} />
              <Route path="auctions" element={<Auctions />} />
              <Route path="auctions/:id" element={<AuctionItem data={data} />} />
            </>
          )}
          {user.artist && (
            <>
              <Route path="add/artwork" element={<NewAuction />} />
              <Route path="artist/auctions" element={<ArtistAuctionList />} />
              <Route path="artist/profile" element={<ArtistProfileDashboard />} />
              <Route path="view/buyer/proposal" element={<BuyerProposal data={data} />} />
            </>
          )}
          {user.buyer && (
            <>
              <Route path="bids" element={<Bids data={data} />} />
              <Route path="view/buyer/proposal" element={<BuyerProposal />} />
              <Route path="buyer/profile" element={<BuyerProfileDashboard data={data} />} />
              <Route path="view/buyer/created/proposal" element={<BuyerCreatedProposal />} />
              <Route path="view/artist/proposal" element={<ArtistProposal />} />
              <Route path="view/buyer/accepted/proposal" element={<BuyerAcceptedProposal />} />
            </>
          )}
        </Route>
      ) : (
        <Route path="/" element={<Navigate to="/signin" replace />} />
      )}
      <Route path="/">
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="admin/signin" element={<AdminSignIn />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
