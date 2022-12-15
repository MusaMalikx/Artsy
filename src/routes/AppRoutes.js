import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuctionItem from "../pages/Auctions/AuctionItem";
import Auctions from "../pages/Auctions/Auctions";
import NewAuction from "../pages/Auctions/NewAuction";
import Chat from "../pages/Chat/Chat";
import Home from "../pages/Home/Home";
import BuyerProposal from "../pages/Proposal/BuyerProposal";
import Login from "../pages/Registration/Login";
import API from "../utils/unsplash";
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
        <Route path="chat" element={<Chat data={data} />} />
        <Route path="auctions" element={<Auctions data={data} />} />
        <Route path="auctions/:id" element={<AuctionItem data={data} />} />
        <Route path="view/buyer/proposal" element={<BuyerProposal />} />
        <Route path="add/artwork" element={<NewAuction/>} />
        <Route path="login" element={<Login/>} />
        {/* <Route path="contact" element={<Contact />} />
        <Route path="our-team" element={<OurTeam />}/> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
