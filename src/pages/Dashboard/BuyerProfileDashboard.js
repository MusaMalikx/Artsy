import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import { AiFillFlag } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { RiMessage2Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BuyerProposal from '../../components/Modals/Proposal/BuyerProposal';
import ProfileReport from '../../components/Modals/Report/ProfileReport';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/reducer/userReducer';
import { Button, Dropdown, IconButton, Popover, Whisper } from 'rsuite';
import ProfileWonAuctionCard from '../../components/Auction/ProfileWonAuctionCard';
import { getAuth, signOut } from 'firebase/auth';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import API from '../../api/server';
import EmptyProfileAuctions from '../../components/Animation/EmptyProfileAuctions';
import ReactJdenticon from 'react-jdenticon';
import { GoUnverified, GoVerified } from 'react-icons/go';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Modal, Form } from 'rsuite';
import {
  nameValidate,
  phoneValidate,
  cnicValidate,
  textValidate
} from '../../helpers/credential-validators';

/*
This component represents the buyers profile dashboard, which displays relevant information and controls for managing an buyer's profile. 
It allows artists to view and update their profile details, view bids, manage their portfolio, and interact with artists. 
This component serves as the central hub for buyers to manage and showcase their won artworks.
*/
export default function BuyerProfileDashboard() {
  const toaster = useToaster();
  const [user] = useAuthState(getAuth());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wonArt, setWonArt] = useState([]);
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
  const [openUpdateInfo, setOpenUpdateInfo] = useState(false);

  const handleUpdateInfoOpen = () => setOpenUpdateInfo(true);
  const handleUpdateInfoClose = () => setOpenUpdateInfo(false);

  //API call for fetching buyer's won auctions
  const getWonArtworks = async () => {
    await API.get(`/api/users/find/artworks/won/${auth.user._id}`)
      .then((res) => {
        setWonArt(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //API call for fetching buyer data
  const fetchBuyerData = async () => {
    const res = await API.get(`/api/users/find/${currentUserID}`);
    if (res.data) {
      setProfileInfo({
        buyerName: res.data.name !== '' ? res.data.name : profileInfo.buyerName,
        email: res.data.email !== '' ? res.data.email : profileInfo.email,
        profileImage: res.data.imageURL !== '' ? res.data.imageURL : profileInfo.profileImage,
        phoneNumber: res.data.phonenumber !== '' ? res.data.phonenumber : 'Unknown',
        cnic: res.data.cnic !== '' ? 'Verified' : 'Not Verified',
        location: res.data.location !== '' ? res.data.location : 'Unknown',
        languages: res.data.languages !== '' ? res.data.languages : 'Unknown'
      });
    }
  };

  useEffect(() => {
    fetchBuyerData();
    getWonArtworks();
  }, []);

  //API call for Signing buyer out of website
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
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0 flex justify-between">
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
                          0
                        </span>
                        <span className="text-sm text-blueGray-400">Live Bidding</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {wonArt.length}
                        </span>
                        <span className="text-sm text-blueGray-400">Auctions Won</span>
                      </div>
                      {auth.user._id !== currentUserID && (
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
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center mb-10 lg:my-10">
                  <div className="flex items-center justify-center">
                    <div className="bg-gray-100 w-fit mr-3 text-xs font-bold px-2 py-1 rounded-sm flex flex-shrink-0 justify-center items-center relative">
                      Buyer
                    </div>
                    {user?.emailVerified ? (
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
                  </div>
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    {profileInfo.buyerName}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {profileInfo.location === 'Unknown'
                      ? 'Pakistan'
                      : profileInfo.location + ', Pakistan'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
              <div className="w-full flex flex-col 2xl:w-1/3">
                <div className="flex-1 bg-white rounded-lg shadow-all p-8">
                  <div className="flex justify-between">
                    <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                    {auth.user._id === currentUserID && (
                      <button
                        onClick={handleUpdateInfoOpen}
                        className="focus:outline-none bg-primary rounded px-2 py-2 text-xs uppercase font-bold text-white active:bg-cyan-700">
                        Update
                      </button>
                    )}
                    {openUpdateInfo && (
                      <UpdateInfo
                        updateData={fetchBuyerData}
                        user={profileInfo}
                        handleClose={handleUpdateInfoClose}
                      />
                    )}
                  </div>
                  <ul className="mt-2 text-gray-700">
                    <li className="flex border-y py-2">
                      <span className="font-bold w-24">Name:</span>
                      <span className="text-gray-700">{profileInfo.buyerName}</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Email:</span>
                      <span className="text-gray-700">{profileInfo.email}</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Mobile:</span>
                      <span
                        className={`${
                          profileInfo.phoneNumber === 'Unknown' ? 'text-red-700' : 'text-gray-700'
                        }`}>
                        {profileInfo.phoneNumber}
                      </span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">CNIC:</span>
                      <span
                        className={`${
                          profileInfo.cnic === 'Not Verified' ? 'text-red-700' : 'text-green-700'
                        }`}>
                        {profileInfo.cnic}
                      </span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Location:</span>
                      <span
                        className={`${
                          profileInfo.location === 'Unknown' ? 'text-red-700' : 'text-gray-700'
                        }`}>
                        {profileInfo.location}
                      </span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Languages:</span>
                      <span
                        className={`${
                          profileInfo.languages === 'Unknown' ? 'text-red-700' : 'text-gray-700'
                        }`}>
                        {profileInfo.languages}
                      </span>
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
                      <div className="w-full lg:w-9/12 px-4 flex overflow-x-scroll">
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

/*
Renders a dropdown menu to display option bids, bids won, add proposals, created proposals, accepted proposals
*/
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

/*
This component handles the functionality for updating user profile information. 
It allows users to modify their personal details such as name, email, and other relevant information. 
The updated data is then saved to the database, ensuring accurate and up-to-date user profiles.
*/
const UpdateInfo = ({ handleClose, user, updateData }) => {
  const name = useRef();
  const phonenumber = useRef();
  const cnicfield = useRef();
  const location = useRef();
  const languages = useRef();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const toaster = useToaster();

  //API call to update profile information
  const updateInformation = async (e) => {
    if (
      nameValidate(name.current.value === '' ? user.buyerName : name.current.value) &&
      phoneValidate(
        phonenumber.current.value === '' ? user.phoneNumber : phonenumber.current.value
      ) &&
      (user.cnic === 'Verified' ||
        cnicValidate(cnicfield.current.value === '' ? user.cnic : cnicfield.current.value)) &&
      textValidate(location.current.value === '' ? user.location : location.current.value) &&
      textValidate(languages.current.value === '' ? user.languages : languages.current.value)
    ) {
      e.preventDefault();
      await API.post(
        '/api/users/update/info',
        {
          name: name.current.value === '' ? user.buyerName : name.current.value,
          phonenumber:
            phonenumber.current.value === '' ? user.phoneNumber : phonenumber.current.value,
          cnic: cnicfield.current.value === '' ? user.cnic : cnicfield.current.value,
          location: location.current.value === '' ? user.location : location.current.value,
          languages: languages.current.value === '' ? user.languages : languages.current.value
        },
        {
          headers: {
            token: 'Bearer ' + auth.token
          }
        }
      );
      updateData();
      Toaster(toaster, 'success', 'Updated Succesfully');
      handleClose();
    } else {
      !nameValidate(name.current.value === '' ? user.buyerName : name.current.value)
        ? name.current.setCustomValidity(
            'Name must contain only alphabets and length should be greater than or equal to 3'
          )
        : name.current.setCustomValidity('');
      !phoneValidate(
        phonenumber.current.value === '' ? user.phoneNumber : phonenumber.current.value
      )
        ? phonenumber.current.setCustomValidity('Invalid Phone Number')
        : phonenumber.current.setCustomValidity('');
      !cnicValidate(cnicfield.current.value === '' ? user.cnic : cnicfield.current.value)
        ? cnicfield.current.setCustomValidity('Invalid CNIC')
        : cnicfield.current.setCustomValidity('');
      !textValidate(location.current.value === '' ? user.location : location.current.value)
        ? location.current.setCustomValidity('Invalid location')
        : location.current.setCustomValidity('');
      !textValidate(languages.current.value === '' ? user.languages : languages.current.value)
        ? languages.current.setCustomValidity('Invalid language')
        : languages.current.setCustomValidity('');
    }
  };
  return (
    <Modal size="xs" open={open} onClose={handleClose}>
      <Modal.Header className="text-center ">
        <Modal.Title>Personal Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex justify-center items-center">
        <Form>
          <Form.Group controlId="name">
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Form.Control inputRef={name} placeholder={user.buyerName} name="name" type="text" />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.ControlLabel>Phone Number</Form.ControlLabel>
            <Form.Control
              inputRef={phonenumber}
              placeholder={user.phoneNumber === 'Unknown' ? '' : user.phoneNumber}
              name="phone"
              type="number"
              onChange={() => {
                if (phonenumber.current.value.length > 11)
                  phonenumber.current.value = phonenumber.current.value.slice(0, 11);
              }}
              minLength={11}
              min={0}
            />
          </Form.Group>
          <Form.Group controlId="cnic">
            <Form.ControlLabel>CNIC</Form.ControlLabel>
            <Form.Control
              inputRef={cnicfield}
              placeholder={user.cnic === 'Not Verified' ? '' : user.cnic}
              name="cnic"
              type="number"
              onChange={() => {
                if (cnicfield.current.value.length > 13)
                  cnicfield.current.value = cnicfield.current.value.slice(0, 13);
              }}
              minLength={13}
              min={0}
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.ControlLabel>Location</Form.ControlLabel>
            <Form.Control
              inputRef={location}
              placeholder={user.location === 'Unknown' ? '' : user.location}
              name="location"
              type="text"
            />
            <Form.HelpText tooltip>Enter your City name</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="language">
            <Form.ControlLabel>Languages</Form.ControlLabel>
            <Form.Control
              inputRef={languages}
              placeholder={user.languages === 'Unknown' ? '' : user.languages}
              name="language"
              type="text"
            />
            <Form.HelpText tooltip>Separate languages by ( English, Urdu)</Form.HelpText>
          </Form.Group>
          <Form.Group className="flex justify-end gap-2">
            <Button
              style={{
                backgroundColor: '#188796'
              }}
              type="submit"
              onClick={updateInformation}
              appearance="primary">
              Ok
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
