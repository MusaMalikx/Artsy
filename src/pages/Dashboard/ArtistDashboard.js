import React from "react";
import Graphs from "../../components/Dashboard/Artist/Graphs";
import Info from "../../components/Dashboard/Artist/Info";
import Navigation from "../../components/Dashboard/Artist/Navigation";
import Profile from "../../components/Dashboard/Artist/Profile";
import Stats from "../../components/Dashboard/Artist/Stats";
import Layout from "../../components/Layouts/ArticleLayout";

const ArtistDashboard = () => {
  return (
    <Layout title="Artist Dashboard">
      <div className="py-10 flex flex-col-reverse md:flex-row gap-4 mx-10 relative">
        <div className="flex-[7]">
          <Stats />
          <Info />
          <Graphs />
        </div>
        <div className="flex mx-auto justify-center">
          <Profile />
        </div>
      </div>
      <div className="fixed bottom-16 flex justify-center w-full">
        <Navigation />
      </div>
    </Layout>
  );
};

export default ArtistDashboard;
