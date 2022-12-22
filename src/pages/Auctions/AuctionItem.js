import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AuctionCard from "../../components/Auction/AuctionCard";
import Layout from "../../components/Layouts/ArticleLayout";

const AuctionItem = ({ data }) => {
  const { state } = useLocation();
  const { user, urls } = state;

  const [quantity, setQuantity] = useState(0);
  //   console.log(user, urls);

  return (
    <Layout title={"Auctions"}>
      <div className="py-10 px-5">
        <p className="font-semibold   text-2xl lg:text-4xl">
          Auction Item
        </p>
        <hr />
        <div className="flex flex-col lg:flex-row mt-20">
          <img
            src={urls.full}
            className="w-96 h-96 rounded-md mx-auto"
            alt={user.username}
          />
          <div className="flex-grow mx-10 flex flex-col justify-between my-10 lg:my-0 space-y-3 lg:space-y-0">
            <div className="flex flex-wrap items-center w-full justify-between">
              <p className="font-mono mr-auto text-gray-600 text-4xl font-bold uppercase">
                {user.name}
              </p>
              <p className="text-xl font-mono text-green-600">21:21:00</p>
            </div>
            <p className="text-lg font-semibold">{user.bio}</p>
            <p className=" font-sans">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </p>
            <div className="flex text-lg">
              <p className="mr-1 font-mono">Current Bid:</p>
              <div className="font-bold text-green-800">
                <span className="mr-0.5">$</span>
                <span>51</span>
              </div>
            </div>
            <div>
              <input
                className="border text-xl px-10 py-2 rounded-xl outline-gray-400 px-auto"
                onChange={(e) =>
                  setQuantity(
                    parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0
                  )
                }
                type="number"
                // value={quantity}
              />
            </div>
            <button className="bg-black text-white w-fit px-10 rounded-2xl py-1 font-extrabold">
              Place Bid
            </button>
          </div>
        </div>
      </div>
      <div className="mx-5 py-20 bg-gray-100 border border-gray-400 rounded-lg mb-20 md:my-20">
        <div className="flex justify-center items-center mb-10">
          <p className="font-semibold   text-2xl">
            Similar Auctions Items
          </p>
        </div>
        <div className="flex items-center flex-wrap justify-center ">
          {data?.slice(4, 9).map((photo) => (
            <AuctionCard key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AuctionItem;
