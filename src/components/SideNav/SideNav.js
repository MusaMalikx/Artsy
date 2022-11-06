import { Sidenav, Nav } from 'rsuite';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import HomeIcon from '@rsuite/icons/legacy/Home';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { useState } from 'react';

const SideNav = () => {
    const [expanded, setExpanded] = useState(false);
    const [activeKey, setActiveKey] = useState('1');
    return (
        <div className='relative'>
            <div className={`${expanded && 'w-60'} fixed z-10 shadow-md`}>
                <Sidenav className='h-screen relative' expanded={expanded} defaultOpenKeys={['3', '4']}>
                    <Sidenav.Body className=''>
                        <Nav activeKey={activeKey} onSelect={setActiveKey}>
                            <Nav.Item eventKey="1" icon={<HomeIcon />}>
                                Home
                            </Nav.Item>
                            <Nav.Item eventKey="2" icon={<GroupIcon />}>
                                User Group
                            </Nav.Item>
                            <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
                                <Nav.Item eventKey="3-1">Geo</Nav.Item>
                                <Nav.Item eventKey="3-2">Devices</Nav.Item>
                                <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
                                <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
                            </Nav.Menu>
                            <Nav.Menu
                                placement="rightStart"
                                eventKey="4"
                                title="Settings"
                                icon={<GearCircleIcon />}
                            >
                                <Nav.Item eventKey="4-1">Applications</Nav.Item>
                                <Nav.Item eventKey="4-2">Channels</Nav.Item>
                                <Nav.Item eventKey="4-3">Versions</Nav.Item>
                                <Nav.Menu eventKey="4-5" title="Custom Action">
                                    <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                                    <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                                </Nav.Menu>
                            </Nav.Menu>
                        </Nav>
                    </Sidenav.Body>
                    <Sidenav.Toggle className='absolute bottom-0 z-10' expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                </Sidenav>
            </div>
            {
                expanded &&
                <div className='fixed w-screen h-screen bg-black bg-opacity-50' />
            }
        </div>
    );
}

export default SideNav