import { Sidenav, Nav } from 'rsuite';
import { Icon } from '@rsuite/icons';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { useState } from 'react';
import { RiAuctionFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Notification from '../Modals/Notification';
import { BsBell } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/reducer/userReducer';
import Wallet from '../Modals/Payment/Wallet';
import { BiWallet } from 'react-icons/bi';

/*
This side navigation bar component provides easy navigation for users to access different sections of the application.
It is designed to be responsive and user-friendly, ensuring a smooth browsing experience.
*/
const SideNav = () => {
  const user = useSelector(selectUser);
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [open, setOpen] = useState(false);
  const handleWalletOpen = () => setOpen(true);
  const handleWalletClose = () => setOpen(false);
  const [openNotification, setNotificationOpen] = useState(false);
  const handleNotificationOpen = () => setNotificationOpen(true);
  const handleNotificationClose = () => setNotificationOpen(false);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [activeKey, setActiveKey] = useState('1');

  return (
    <div className="relative z-30">
      <div className={`${expanded && 'w-60'} fixed z-10 shadow-md`}>
        <Sidenav className="min-h-screen" expanded={expanded} defaultOpenKeys={['3', '4']}>
          <Sidenav.Body className="">
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item onClick={() => navigate('/')} eventKey="1" icon={<HomeIcon />}>
                Home
              </Nav.Item>
              <Nav.Item
                onClick={() => navigate('/auctions/live/1')}
                eventKey="2"
                icon={<Icon as={RiAuctionFill} />}>
                Auctions
              </Nav.Item>
              <Nav.Item
                onClick={() => navigate('/search')}
                eventKey="3"
                icon={<Icon as={BsSearch} />}>
                Search
              </Nav.Item>

              <Nav.Item onClick={handleNotificationOpen} eventKey="4" icon={<Icon as={BsBell} />}>
                Notification
              </Nav.Item>
              <Notification isOpen={openNotification} handleClose={handleNotificationClose} />
              <Nav.Item onClick={handleWalletOpen} eventKey="5" icon={<Icon as={BiWallet} />}>
                Wallet
              </Nav.Item>
              <Wallet open={open} handleClose={handleWalletClose} />
              {user.buyer && (
                <Nav.Item
                  onClick={() => navigate(`/buyer/profile/${auth.user._id}`)}
                  eventKey="6"
                  icon={<Icon as={CgProfile} />}>
                  Buyer Profile
                </Nav.Item>
              )}
              {user.artist && (
                <Nav.Item
                  onClick={() => navigate(`/artist/profile/${auth.user._id}`)}
                  eventKey="7"
                  icon={<Icon as={CgProfile} />}>
                  Artist Profile
                </Nav.Item>
              )}
            </Nav>
          </Sidenav.Body>
          <Sidenav.Toggle expanded={expanded} onToggle={(expanded) => setExpanded(expanded)} />
        </Sidenav>
      </div>
      {expanded && <div className="fixed w-screen h-screen bg-black bg-opacity-50" />}
    </div>
  );
};

export default SideNav;
