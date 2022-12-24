import React, { useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { RiMessage2Fill } from 'react-icons/ri';
import ProfileAuctionCard from '../../components/Auction/ProfileAuctionCard';
import BuyerReview from '../../components/Modals/BuyerReview';
import { motion } from 'framer-motion';
export default function ArtistProfileDashboard({ data }) {
  const [openReview, setOpenReview] = useState(false);
  return (
    <Layout title="Listed Auctions">
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              'background-image':
                "url('https://img.freepik.com/free-photo/blue-oil-paint-strokes-textured-background_53876-98328.jpg?w=2000')"
            }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{
              transform: 'translateZ(0px)'
            }}></div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative w-full text-center flex justify-center">
                      <img
                        alt="..."
                        src="https://media.licdn.com/dms/image/C4D03AQE2uqmIgyKi1Q/profile-displayphoto-shrink_800_800/0/1651353340052?e=1677110400&v=beta&t=316TXpRJ03xuXyNku3fHxaoMVroBMNYKmL2fuR90zXg"
                        className="shadow-xl rounded-full h-36 w-36 md:h-auto md:w-48 object-cover align-middle border-none absolute -m-20 -ml-24 md:-mt-24 max-w-200-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0 flex justify-between">
                      <div className="text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          <div className="flex text-yellow-500">
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                          </div>
                        </span>
                        <span className="text-sm text-blueGray-400 block">12 Reviews</span>
                        <span className="text-sm text-blueGray-400">
                          <div className="mt-2 flex w-full justify-center">
                            <button
                              className="bg-primary active:bg-cyan-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setOpenReview(true)}>
                              View
                            </button>
                            {<BuyerReview open={openReview} setOpen={setOpenReview} />}
                          </div>
                        </span>
                      </div>
                      <div>
                        <button
                          className="bg-primary active:bg-cyan-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button">
                          <RiMessage2Fill className="inline text-lg mr-2" />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">Auctions Live</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">Auctions Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    Musa Malik
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    Lahore, Pakistan
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div>
                    <p className="text-4xl font-bold">Live Auctions</p>
                  </div>
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      {data?.map((photo) => (
                        <motion.div
                          key={photo.id}
                          animate={{ x: [-2000, 350, 0] }}
                          transition={{ duration: 1.5, delay: 0 }}>
                          <ProfileAuctionCard key={photo.id} photo={photo} />
                        </motion.div>
                      ))}

                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
