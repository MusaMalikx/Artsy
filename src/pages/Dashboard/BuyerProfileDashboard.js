import React, { useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import { AiFillFlag, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { RiMessage2Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import BuyerProposal from '../../components/Modals/BuyerProposal';
import ProfileReport from '../../components/Modals/ProfileReport';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/userReducer';
import { Button, Dropdown, IconButton } from 'rsuite';
import BuyerReview from '../../components/Modals/BuyerReview';
export default function BuyerProfileDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openReview, setOpenReview] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  return (
    <Layout title="Profile">
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              'background-image':
                "url('https://img.freepik.com/free-photo/blue-oil-paint-strokes-textured-background_53876-98328.jpg?w=2000')"
            }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
            <div
              className="flex justify-end m-5"
              onClick={() => {
                navigate('/signin');
                dispatch(logout());
              }}>
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
                        src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
                        className="shadow-xl rounded-full h-36 w-36 md:h-auto md:w-48 object-cover align-middle border-none absolute -m-20 -ml-24 md:-mt-24 max-w-200-px"
                        alt="profile"
                        srcSet=""
                      />
                      {/* <img
                        alt="..."
                        src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
                        className="shadow-xl rounded-full h-36 w-36 md:h-auto md:w-48 object-cover align-middle border-none absolute -m-20 -ml-24 md:-mt-24 max-w-200-px"
                      /> */}
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
                          type="button"
                          onClick={() => navigate('/chat')}>
                          <RiMessage2Fill className="inline text-lg mr-2" />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex items-center justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4">
                        <Drop />
                      </div>
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
                      <div
                        onClick={() => setOpenReport(true)}
                        className="mr-4 p-3 text-center text-red-500 hover:text-red-700 hover:cursor-pointer">
                        <span className="text-xl font-bold block uppercase tracking-wide mb-2">
                          <AiFillFlag className="w-full" />
                        </span>
                        <span className="text-sm ">Report</span>
                      </div>
                      {<ProfileReport open={openReport} setOpen={setOpenReport} />}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    Ahmed
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    Lahore, Pakistan
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
  const [openField, setOpenField] = useState(false);
  return (
    <Dropdown renderToggle={renderIconButton}>
      <Dropdown.Item onClick={() => navigate('/bids')}>Bids</Dropdown.Item>
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
