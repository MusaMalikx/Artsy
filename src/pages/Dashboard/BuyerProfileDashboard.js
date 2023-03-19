import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import { AiFillFlag } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { RiMessage2Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import BuyerProposal from '../../components/Modals/Proposal/BuyerProposal';
import ProfileReport from '../../components/Modals/Report/ProfileReport';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/reducer/userReducer';
import { Button, Dropdown, IconButton } from 'rsuite';
//import BuyerReview from '../../components/Modals/Review/BuyerReview';
import ProfileWonAuctionCard from '../../components/Auction/ProfileWonAuctionCard';
import { getAuth, signOut } from 'firebase/auth';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import API from '../../api/server';
import EmptyProfileAuctions from '../../components/Animation/EmptyProfileAuctions';
import ReactJdenticon from 'react-jdenticon';

export default function BuyerProfileDashboard() {
  const toaster = useToaster();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wonArt, setWonArt] = useState([]);
  // const [openReview, setOpenReview] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [profileInfo, setProfileInfo] = useState({
    buyerName: 'Unknown',
    profileImage:
      'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
    email: 'Unknown Email'
  });
  const location = useLocation();
  const currentUserID = location.pathname.split('/')[3];

  const getWonArtworks = async () => {
    const res = await API.get(`/api/users/find/artworks/won/${auth.user._id}`);
    setWonArt(res.data);
  };

  const fetchBuyerData = async () => {
    if (auth.user._id !== currentUserID) {
      const res = await API.get(`/api/users/find/${currentUserID}`);
      if (res.data) {
        setProfileInfo({
          buyerName: res.data.name !== '' ? res.data.name : profileInfo.buyerName,
          email: res.data.email !== '' ? res.data.email : profileInfo.email,
          profileImage: res.data.imageURL !== '' ? res.data.imageURL : profileInfo.profileImage
        });
      }
    } else {
      setProfileInfo({
        buyerName: auth.user.name ? auth.user.name : profileInfo.buyerName,
        email: auth.user.email ? auth.user.email : profileInfo.email,
        profileImage: auth.user.imageURL !== '' ? auth.user.imageURL : profileInfo.profileImage
      });
    }
  };

  useEffect(() => {
    fetchBuyerData();
    getWonArtworks();
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
      <main className="profile-page bg-gray-200">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-96 bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')"
            }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
            {auth?.user?._id === currentUserID && (
              <div className="flex justify-end m-5" onClick={logoutuser}>
                <Button className="hide-red" color="red" appearance="primary">
                  Logout
                </Button>
              </div>
            )}
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{
              transform: 'translateZ(0px)'
            }}></div>
        </section>
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-4 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative w-full text-center flex justify-center">
                      <div className="shadow-xl object-cover align-middle border-none absolute -m-20 -ml-24 md:-mt-24 max-w-200 bg-white">
                        <ReactJdenticon
                          size="200"
                          value={
                            auth.user._id === currentUserID ? auth?.user.email : profileInfo.email
                          }
                        />
                      </div>
                      {/* <img
                        src={profileInfo.profileImage}
                        className="shadow-xl rounded-full h-36 w-36 md:h-auto md:w-48 object-cover align-middle border-none absolute -m-20 -ml-24 md:-mt-24 max-w-200-px"
                        alt="profile"
                        srcSet=""
                      /> */}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0 flex justify-between">
                      {/* <div className="text-center">
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
                      </div>*/}
                      <div className="flex justify-end items-end w-full">
                        <button
                          className="bg-primary active:bg-cyan-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => navigate('/chat')}>
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
                        <span className="text-sm text-blueGray-400">Live Bidding</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {wonArt.length}
                        </span>
                        <span className="text-sm text-blueGray-400">Auctions Won</span>
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
                <div className="text-center my-10">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    {profileInfo.buyerName}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    Lahore, Pakistan
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
              <div className="w-full flex flex-col 2xl:w-1/3">
                <div className="flex-1 bg-white rounded-lg shadow-all p-8">
                  <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                  <ul className="mt-2 text-gray-700">
                    <li className="flex border-y py-2">
                      <span className="font-bold w-24">Name:</span>
                      <span className="text-gray-700">Amanda S. Ross</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Email:</span>
                      <span className="text-gray-700">amandaross@example.com</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Mobile:</span>
                      <span className="text-gray-700">+92 321 4532123</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Age:</span>
                      <span className="text-gray-700">10 Jan 2022 (25 days ago)</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Gender:</span>
                      <span className="text-gray-700">Male</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Location:</span>
                      <span className="text-gray-700">Lahore, Punjab</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Languages:</span>
                      <span className="text-gray-700">English, Urdu</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full flex flex-col 2xl:w-2/3">
                <div className="flex-1 bg-white rounded-lg shadow-all p-8">
                  <div className="mt-10 py-10 text-center">
                    <div>
                      <p className="text-4xl font-bold">Won Auctions</p>
                    </div>
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        {wonArt.length > 0 ? (
                          wonArt.map((artwork) => (
                            <motion.div
                              key={artwork._id}
                              animate={{ x: [-2000, 350, 0] }}
                              transition={{ duration: 1.5, delay: 0 }}>
                              <ProfileWonAuctionCard key={artwork._id} artwork={artwork} />
                            </motion.div>
                          ))
                        ) : (
                          <EmptyProfileAuctions />
                        )}
                        <div></div>
                      </div>
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
  return <IconButton {...props} ref={ref} icon={<BsThreeDotsVertical />} circle className="hide" />;
};

const Drop = () => {
  const navigate = useNavigate();
  const [openField, setOpenField] = useState(false);
  return (
    <Dropdown renderToggle={renderIconButton}>
      <Dropdown.Item onClick={() => navigate('/bids')}>Bids</Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/bids/won')}> Bids Won</Dropdown.Item>
      <Dropdown.Item onClick={() => setOpenField(true)}>Add Proposals</Dropdown.Item>
      {<BuyerProposal isOpen={openField} setIsOpen={setOpenField} />}
      <Dropdown.Item onClick={() => navigate('/view/buyer/created/proposal')}>
        Created Proposals
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/view/buyer/accepted/proposal')}>
        Accepted Proposals
      </Dropdown.Item>
    </Dropdown>
  );
};
