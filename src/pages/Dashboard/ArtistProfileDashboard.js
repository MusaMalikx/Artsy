import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import { AiFillStar, AiOutlineStar, AiFillFlag } from 'react-icons/ai';
import { RiMessage2Fill } from 'react-icons/ri';
import ProfileAuctionCard from '../../components/Auction/ProfileAuctionCard';
import BuyerReview from '../../components/Modals/BuyerReview';
import { motion } from 'framer-motion';
import ProfileReport from '../../components/Modals/ProfileReport';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/reducer/userReducer';
import { Button, Dropdown, IconButton } from 'rsuite';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { getAuth, signOut } from 'firebase/auth';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import API from '../../api/server';
export default function ArtistProfileDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toaster = useToaster();
  const [openReview, setOpenReview] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const location = useLocation();
  const currentUserID = location.pathname.split('/')[3];
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [profileInfo, setProfileInfo] = useState({
    artistName: 'Unknown',
    profileImage:
      'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
    artworks: []
  });
  const fetchArtworks = async () => {
    const res = await API.get(`/api/artworks/artist/${currentUserID}`);
    if (res.data) {
      setProfileInfo((info) => {
        return {
          ...info,
          artworks: res.data
        };
      });
    }
  };

  const fetchArtistData = async () => {
    if (auth.user._id !== currentUserID) {
      const res = await API.get(`/api/artists/find/${currentUserID}`);
      if (res.data) {
        setProfileInfo({
          artistName: res.data.name !== '' ? res.data.name : profileInfo.buyerName,
          profileImage: res.data.imageURL !== '' ? res.data.imageURL : profileInfo.profileImage
        });
      }
    } else {
      setProfileInfo({
        artistName: auth.user.name ? auth.user.name : profileInfo.buyerName,
        profileImage: auth.user.imageURL !== '' ? auth.user.imageURL : profileInfo.profileImage
      });
    }
  };

  useEffect(() => {
    fetchArtistData();
    fetchArtworks();
  }, []);
  const logoutuser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful for firebase
        localStorage.setItem('auth', JSON.stringify(null)); //remove auth token from localstorage
        setAuth(JSON.parse(localStorage.getItem('auth')));
        navigate('/signin');
        dispatch(logout()); //Remove redux state for signedIn to false
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        Toaster(toaster, 'error', 'An Error Occured When Logging Out, Refresh Page');
      });
  };
  return (
    <Layout title="Profile">
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/blue-oil-paint-strokes-textured-background_53876-98328.jpg?w=2000')"
            }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
            <div className="flex justify-end m-5" onClick={logoutuser}>
              <Button color="red" appearance="primary">
                Logout
              </Button>
            </div>
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
                        referrerPolicy="no-referrer"
                        alt="..."
                        src={profileInfo.profileImage}
                        // src="https://media.licdn.com/dms/image/C4D03AQE2uqmIgyKi1Q/profile-displayphoto-shrink_800_800/0/1651353340052?e=1677110400&v=beta&t=316TXpRJ03xuXyNku3fHxaoMVroBMNYKmL2fuR90zXg"
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
                          onClick={() => navigate('/chat')}
                          className="bg-primary active:bg-cyan-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button">
                          <RiMessage2Fill className="inline text-lg mr-2" />
                          {auth.user._id === currentUserID ? 'Chat' : 'Message'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex items-center justify-center py-4 lg:pt-4 pt-8">
                      {auth.user._id === currentUserID ? (
                        <>
                          <div className="mr-4">
                            <Drop />
                          </div>
                        </>
                      ) : (
                        ''
                      )}
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
                      {auth.user._id !== currentUserID ? (
                        <>
                          <div
                            onClick={() => setOpenReport(true)}
                            className="mr-4 p-3 text-center text-red-500 hover:text-red-700 hover:cursor-pointer">
                            <span className="text-xl font-bold block uppercase tracking-wide mb-2">
                              <AiFillFlag className="w-full" />
                            </span>
                            <span className="text-sm ">Report</span>
                          </div>
                          {<ProfileReport open={openReport} setOpen={setOpenReport} />}
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    {profileInfo.artistName}
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
                      {profileInfo.artworks?.map((artwork) => (
                        <motion.div
                          key={artwork._id}
                          animate={{ x: [-2000, 350, 0] }}
                          transition={{ duration: 1.5, delay: 0 }}>
                          <ProfileAuctionCard key={artwork._id} artwork={artwork} />
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

const renderIconButton = (props, ref) => {
  return <IconButton {...props} ref={ref} icon={<BsThreeDotsVertical />} circle />;
};

const Drop = () => {
  const navigate = useNavigate();
  return (
    <Dropdown renderToggle={renderIconButton}>
      <Dropdown.Item onClick={() => navigate('/add/artwork')}>Add Artwork</Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/artist/auctions')}>Listed Auctions</Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/view/buyer/proposal')}>
        Buyer Proposals
      </Dropdown.Item>
    </Dropdown>
  );
};
