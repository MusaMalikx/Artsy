import { Sidenav, Nav } from "rsuite";
import { Icon } from "@rsuite/icons";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import HomeIcon from "@rsuite/icons/legacy/Home";
import AuctionIcon from "@rsuite/icons/legacy/Bitbucket";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import { useState } from "react";
import EditIcon from '@rsuite/icons/Edit';
import { RiAuctionFill } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  return (
    <div className="relative">
      <div className={`${expanded && "w-60"} fixed z-10 shadow-md`}>
        <Sidenav
          className="min-h-screen"
          expanded={expanded}
          defaultOpenKeys={["3", "4"]}
        >
          <Sidenav.Body className="">
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item
                onClick={() => navigate("/")}
                eventKey="1"
                icon={<HomeIcon />}
              >
                Home
              </Nav.Item>
              <Nav.Item
                onClick={() => navigate("/auctions")}
                eventKey="2"
                icon={<Icon as={RiAuctionFill} />}
              >
                Auctions
              </Nav.Item>
             
              {/* <Nav.Item eventKey="2" icon={<GroupIcon />}>
                User Group
              </Nav.Item> */}
              <Nav.Menu
                placement="rightStart"
                eventKey="3"
                title="Artist"
                icon={<Icon as={EditIcon} />}
              >
                 <Nav.Item
                onClick={() => navigate("/proposal")}
                eventKey="3-1"
              >
                Proposals
              </Nav.Item>
    
              </Nav.Menu>
              <Nav.Menu
                placement="rightStart"
                eventKey="4"
                title="Advanced"
                icon={<MagicIcon />}
              >
                <Nav.Item eventKey="4-1">Geo</Nav.Item>
                <Nav.Item eventKey="4-2">Devices</Nav.Item>
                <Nav.Item eventKey="4-3">Loyalty</Nav.Item>
                <Nav.Item eventKey="4-4">Visit Depth</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                placement="rightStart"
                eventKey="4"
                title="Settings"
                icon={<GearCircleIcon />}
              >
                <Nav.Item eventKey="5-1">Applications</Nav.Item>
                <Nav.Item eventKey="5-2">Channels</Nav.Item>
                <Nav.Item eventKey="5-3">Versions</Nav.Item>
                <Nav.Menu eventKey="5-5" title="Custom Action">
                  <Nav.Item eventKey="5-5-1">Action Name</Nav.Item>
                  <Nav.Item eventKey="5-5-2">Action Params</Nav.Item>
                </Nav.Menu>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
          <Sidenav.Toggle
            expanded={expanded}
            onToggle={(expanded) => setExpanded(expanded)}
          />
        </Sidenav>
      </div>
      {expanded && (
        <div className="fixed w-screen h-screen bg-black bg-opacity-50" />
      )}
    </div>
  );
};

export default SideNav;
