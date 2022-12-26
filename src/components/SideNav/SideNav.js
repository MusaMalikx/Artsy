import { Sidenav, Nav } from 'rsuite';
import { Icon } from '@rsuite/icons';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { useState } from 'react';
import { RiAuctionFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Notification from '../Modals/Notification';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/userReducer';
import Wallet from '../Modals/Wallet';
import { BiWallet } from 'react-icons/bi';

const SideNav = () => {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(user);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  return (
    <div className="relative">
      <div className={`${expanded && 'w-60'} fixed z-10 shadow-md`}>
        <Sidenav className="min-h-screen" expanded={expanded} defaultOpenKeys={['3', '4']}>
          <Sidenav.Body className="">
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item onClick={() => navigate('/')} eventKey="1" icon={<HomeIcon />}>
                Home
              </Nav.Item>
              <Nav.Item
                onClick={() => navigate('/auctions')}
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
              <Notification />
              <Nav.Item onClick={handleOpen} eventKey="4" icon={<Icon as={BiWallet} />}>
                Wallet
              </Nav.Item>
              <Wallet open={open} handleClose={handleClose} />
              {user.buyer && (
                <Nav.Item
                  onClick={() => navigate('/buyer/profile')}
                  eventKey="5"
                  icon={<Icon as={CgProfile} />}>
                  Buyer Profile
                </Nav.Item>
              )}
              {user.artist && (
                <Nav.Item
                  onClick={() => navigate('/artist/profile')}
                  eventKey="5"
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
