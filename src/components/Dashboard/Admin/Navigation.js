import React from 'react';
import { GrView } from 'react-icons/gr';
import { /*CgDisplayFlex,*/ CgProfile, CgUserlane } from 'react-icons/cg';
import { BsChatDots } from 'react-icons/bs';
import { MdReportProblem } from 'react-icons/md';
import { IconButton, Popover, Whisper } from 'rsuite';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ bool }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="backdrop-blur-md shadow-md bg-[#FEFCF3]/40 space-x-5 py-2.5 px-10 flex rounded-l-full rounded-r-full border border-double">
        <Pop
          icon={<CgProfile size={25} onClick={() => navigate('/admin/dashboard')} />}
          name="Dashboard"
          bool={bool}
        />
        <Pop
          icon={<GrView size={25} />}
          onClick={() => navigate('/admin/view/auctions')}
          name="View Listed Auctions"
          bool={bool}
        />
        <Pop
          icon={<BsChatDots size={25} onClick={() => navigate('/admin/chat')} />}
          name="Chat"
          bool={bool}
        />
        <Pop
          icon={<CgUserlane size={25} onClick={() => navigate('/admin/users')} />}
          name="Users"
          bool={bool}
        />
        {/* <Pop icon={<CgDisplayFlex size={25} />} name="View Proposals" /> */}
        <Pop
          icon={<MdReportProblem size={25} onClick={() => navigate('/admin/view/reports')} />}
          name="Reports"
          bool={bool}
        />
      </div>
    </>
  );
};

const Pop = ({ icon, name, onClick, bool }) => {
  return (
    <Whisper
      placement={bool ? 'bottom' : 'top'}
      trigger="hover"
      controlId="control-id-hover"
      className="border"
      speaker={
        <Popover>
          <span>{name}</span>
        </Popover>
      }>
      <IconButton
        onClick={onClick}
        size="lg"
        className="shadow-lg focus:outline-none border bg-white"
        icon={icon}
        circle
      />
    </Whisper>
  );
};

export default Navigation;
