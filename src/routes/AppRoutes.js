import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ArtistAuctionList from "../pages/Artist/ArtistAuctionList";
import AuctionItem from "../pages/Auctions/AuctionItem";
import Auctions from "../pages/Auctions/Auctions";
import NewAuction from "../pages/Auctions/NewAuction";
import Chat from "../pages/Chat/Chat";
import ArtistDashboard from "../pages/Dashboard/ArtistDashboard";
import Home from "../pages/Home/Home";
import BuyerProposal from "../pages/Proposal/BuyerProposal";
import Search from "../pages/Search/Search";
import API from "../utils/unsplash";
import Login from "../pages/Registration/Login";
import SignUp from "../pages/Registration/SignUp";
const AppRoutes = () => {
  const [data, setPhotosResponse] = useState(null);

  useEffect(() => {
    API.search
      .getPhotos({ query: "art" })
      .then((res) => {
        setPhotosResponse(res.response.results);
        console.log(res.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home data={data} />} />
        <Route path="artist/dashboard" element={<ArtistDashboard data={data} />} />
        <Route path="artist/auctions" element={<ArtistAuctionList />} />
        <Route path="chat" element={<Chat data={data} />} />
        <Route path="search" element={<Search data={data} />} />
        <Route path="auctions" element={<Auctions data={data} />} />
        <Route path="auctions/:id" element={<AuctionItem data={data} />} />
        <Route path="view/buyer/proposal" element={<BuyerProposal />} />
        <Route path="add/artwork" element={<NewAuction/>} />
        {/* <Route path="contact" element={<Contact />} />
        <Route path="our-team" element={<OurTeam />}/> */}
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;
