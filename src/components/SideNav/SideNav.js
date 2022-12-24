import { Sidenav, Nav } from 'rsuite';
import { Icon } from '@rsuite/icons';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import HomeIcon from '@rsuite/icons/legacy/Home';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { useState } from 'react';
import EditIcon from '@rsuite/icons/Edit';
import { RiAuctionFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { BsBadge3D, BsChatLeftQuote, BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import Notification from '../Modals/Notification';
import BuyerProposal from '../Modals/BuyerProposal';

const SideNav = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [openField, setOpenField] = useState(false);
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
                onClick={() => navigate('/profile')}
                eventKey="2"
                icon={<Icon as={CgProfile} />}>
                Profile
              </Nav.Item>
              <Nav.Item
                onClick={() => navigate('/auctions')}
                eventKey="3"
                icon={<Icon as={RiAuctionFill} />}>
                Auctions
              </Nav.Item>
              <Nav.Item
                onClick={() => navigate('/chat')}
                eventKey="4"
                icon={<Icon as={BsChatLeftQuote} />}>
                Chat
              </Nav.Item>
              <Nav.Item
                onClick={() => navigate('/bids')}
                eventKey="4"
                icon={<Icon as={BsBadge3D} />}>
                Bids
              </Nav.Item>
              <Nav.Item
                onClick={() => navigate('/search')}
                eventKey="5"
                icon={<Icon as={BsSearch} />}>
                Search
              </Nav.Item>
              <Notification />

              <Nav.Menu
                placement="rightStart"
                eventKey="6"
                title="Buyer"
                icon={<Icon as={BsPencilSquare} />}>
                <Nav.Item onClick={() => setOpenField(true)} eventKey="6-1">
                  Create Proposal
                </Nav.Item>
                {<BuyerProposal isOpen={openField} setIsOpen={setOpenField} />}
                <Nav.Item onClick={() => navigate('/view/created/proposal')} eventKey="6-2">
                  View Proposals
                </Nav.Item>
              </Nav.Menu>

              <Nav.Menu
                placement="rightStart"
                eventKey="7"
                title="Artist"
                icon={<Icon as={EditIcon} />}>
                <Nav.Item onClick={() => navigate('/view/buyer/proposal')} eventKey="7-1">
                  Proposals
                </Nav.Item>

                <Nav.Item onClick={() => navigate('/add/artwork')} eventKey="7-2">
                  Add Artwork
                </Nav.Item>
                <Nav.Item onClick={() => navigate('/artist/dashboard')} eventKey="7-3">
                  Artist Dashboard
                </Nav.Item>
                <Nav.Item onClick={() => navigate('/artist/auctions')} eventKey="7-4">
                  Artist View Auctions List
                </Nav.Item>
              </Nav.Menu>

              <Nav.Menu placement="rightStart" eventKey="8" title="Advanced" icon={<MagicIcon />}>
                <Nav.Item eventKey="8-1">Geo</Nav.Item>
                <Nav.Item eventKey="8-2">Devices</Nav.Item>
                <Nav.Item eventKey="8-3">Loyalty</Nav.Item>
                <Nav.Item eventKey="8-4">Visit Depth</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                placement="rightStart"
                eventKey="9"
                title="Settings"
                icon={<GearCircleIcon />}>
                <Nav.Item eventKey="9-1">Applications</Nav.Item>
                <Nav.Item eventKey="9-2">Channels</Nav.Item>
                <Nav.Item eventKey="9-3">Versions</Nav.Item>
                <Nav.Menu eventKey="9-5" title="Custom Action">
                  <Nav.Item eventKey="9-5-1">Action Name</Nav.Item>
                  <Nav.Item eventKey="9-5-2">Action Params</Nav.Item>
                </Nav.Menu>
              </Nav.Menu>
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
