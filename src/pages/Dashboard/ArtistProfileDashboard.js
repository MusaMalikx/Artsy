import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import { AiFillFlag } from 'react-icons/ai';
import { RiMessage2Fill } from 'react-icons/ri';
import ProfileAuctionCard from '../../components/Auction/ProfileAuctionCard';
import BuyerReview from '../../components/Modals/Review/BuyerReview';
import { motion } from 'framer-motion';
import ProfileReport from '../../components/Modals/Report/ProfileReport';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/reducer/userReducer';
import { Button, Dropdown, IconButton, Popover, Rate, Whisper } from 'rsuite';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { getAuth, signOut } from 'firebase/auth';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import API from '../../api/server';
import EmptyProfileAuctions from '../../components/Animation/EmptyProfileAuctions';
import ReactJdenticon from 'react-jdenticon';
import { GoUnverified, GoVerified } from 'react-icons/go';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ArtistProfileDashboard() {
  const navigate = useNavigate();
  const [user] = useAuthState(getAuth());
  const dispatch = useDispatch();
  const toaster = useToaster();
  const [openReview, setOpenReview] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [rating, setRating] = useState({
    total: 0,
    average: 0
  });
  const location = useLocation();
  const currentUserID = location.pathname.split('/')[3];
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [profileInfo, setProfileInfo] = useState({
    artistName: 'Unknown',
    profileImage:
      'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
    artworks: [],
    email: 'Unknown Email'
  });

  const fetchArtistData = async () => {
    const res = await API.get(`/api/artworks/artist/${currentUserID}`);
    if (res.data) {
      setProfileInfo({
        artistName: res.data.name !== '' ? res.data.name : profileInfo.artistName,
        email: res.data.email !== '' ? res.data.email : profileInfo.email,
        profileImage: res.data.imageURL !== '' ? res.data.imageURL : profileInfo.profileImage,
        artworks: res.data.artworks
      });
    }
  };

  const fetchAverageRating = async () => {
    const res = await API.get(`/api/artists/rating/average/${currentUserID}`);
    if (res.status === 200) {
      setRating({
        total: res.data.totalRatings,
        average: res.data.averageRating
      });
    }
  };

  useEffect(() => {
    fetchArtistData();
    fetchAverageRating();
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
                <Button color="red" appearance="primary">
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
                            auth?.user._id === currentUserID ? auth?.user.email : profileInfo.email
                          }
                        />
                      </div>
                      {/* <img
                        referrerPolicy="no-referrer"
                        alt="..."
                        src={profileInfo.profileImage}
                        // src="https://media.licdn.com/dms/image/C4D03AQE2uqmIgyKi1Q/profile-displayphoto-shrink_800_800/0/1651353340052?e=1677110400&v=beta&t=316TXpRJ03xuXyNku3fHxaoMVroBMNYKmL2fuR90zXg"
                        className="shadow-xl rounded-full h-36 w-36 md:h-auto md:w-48 object-cover align-middle border-none absolute -m-20 -ml-24 md:-mt-24 max-w-200-px"
                      /> */}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0 flex justify-between">
                      <div className="text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          <div className="flex text-yellow-500">
                            {/* <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar /> */}
                            <Rate value={rating.average} readOnly size="xs" />
                          </div>
                        </span>
                        <span className="text-sm text-blueGray-400 block">
                          {rating.total} Reviews
                        </span>
                        <span className="text-sm text-blueGray-400">
                          <div className="mt-2 flex w-full justify-center">
                            <button
                              className="bg-primary active:bg-cyan-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setOpenReview(true)}>
                              View
                            </button>
                            {
                              <BuyerReview
                                artistId={currentUserID}
                                open={openReview}
                                setOpen={setOpenReview}
                              />
                            }
                          </div>
                        </span>
                      </div>
                      <div className="flex w-full justify-end items-start">
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
                          {profileInfo.artworks.length}
                        </span>
                        {/* <span className="text-sm text-blueGray-400">Auctions Live</span> */}
                        {/* Later display correct live auctions and closed auctions for now API is only sending back all auctions */}
                        <span className="text-sm text-blueGray-400">All Auctions</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          0
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
                <div className="text-center mb-10 lg:my-10">
                  <div className="flex items-center justify-center">
                    <div className="bg-gray-100 w-fit mr-3 text-xs font-bold px-2 py-1 rounded-sm flex flex-shrink-0 justify-center items-center relative">
                      Artist
                    </div>
                    {user.emailVerified ? (
                      <Whisper
                        className="p-0"
                        placement="right"
                        trigger="hover"
                        controlId="control-id-hover"
                        enterable
                        speaker={
                          <Popover title="Account Verified">
                            <div>Your Account has been verified</div>
                          </Popover>
                        }>
                        {/* <Button>Hover</Button> */}
                        <IconButton
                          className="hide"
                          icon={<GoVerified className="text-green-500 text-xl" />}
                          circle
                        />
                      </Whisper>
                    ) : (
                      <Whisper
                        className="p-0"
                        placement="right"
                        trigger="hover"
                        controlId="control-id-hover"
                        enterable
                        speaker={
                          <Popover title="Account Unverified">
                            <Link to={`${location.pathname}/verify-account`}>
                              Verify your account
                            </Link>
                          </Popover>
                        }>
                        <IconButton
                          className="hide"
                          icon={<GoUnverified className="text-yellow-500 text-xl" />}
                          circle
                        />
                      </Whisper>
                    )}
                    {/* <Whisper
                      placement="bottomStart"
                      controlId="control-id-with-dropdown"
                      trigger="click"
                      ref={ref}
                      speaker={<VerifyPopover onSelect={handleSelectMenu} />}>
                      <Button>File</Button>
                    </Whisper> */}
                  </div>
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
              <div className="flex flex-col w-full 2xl:w-2/3">
                <div className="flex-1 bg-white rounded-lg shadow-all p-8">
                  <div className="py-10 text-center">
                    <div>
                      <p className="text-4xl font-bold">All Auctions</p>
                    </div>
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        {profileInfo.artworks.length > 0 ? (
                          profileInfo.artworks.map((artwork) => (
                            <motion.div
                              key={artwork._id}
                              animate={{ x: [-2000, 350, 0] }}
                              transition={{ duration: 1.5, delay: 0 }}>
                              <ProfileAuctionCard key={artwork._id} artwork={artwork} />
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
      <Dropdown.Item onClick={() => navigate('/view/artist/accepted/bids')}>
        Accepted Bids
      </Dropdown.Item>
    </Dropdown>
  );
};
