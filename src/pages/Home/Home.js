import React from "react";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Layout from "../../components/Layouts/ArticleLayout";

const Home = () => {
  return (
    <Layout title="Home">
      <div className="flex flex-col justify-center items-center min-h-screen my-auto text-2xl space-y-2">
        Artsy Homepage
      </div>
    </Layout>
  );
};

export default Home;
