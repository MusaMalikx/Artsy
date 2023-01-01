import React, { useState } from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { GrView } from 'react-icons/gr';
import { CgDisplayFlex, CgProfile } from 'react-icons/cg';
import { BsWallet2, BsChatDots } from 'react-icons/bs';
import { MdReportProblem } from 'react-icons/md';
import { IconButton, Popover, Whisper } from 'rsuite';
import Wallet from '../../Modals/Wallet';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const viewReports = (e) => {
    e.preventDefault();
    navigate('/view/reports');
  };
  const showDashboard = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };
  return (
    <>
      <div className="backdrop-blur-sm shadow-md bg-[#FEFCF3]/30 space-x-5 py-2.5 px-10 flex rounded-l-full rounded-r-full border border-double">
        <div onClick={showDashboard}>
          <Pop icon={<CgProfile size={25} />} name="Dashboard" />
        </div>
        <Pop icon={<AiOutlineAppstoreAdd size={25} />} name="Add Auction Item" />
        <Pop icon={<GrView size={25} />} name="View Listed Auctions" />
        <div onClick={handleOpen}>
          <Pop icon={<BsWallet2 size={25} />} name="Wallet" />
        </div>
        <Pop icon={<BsChatDots size={25} />} name="Chat" />
        <Pop icon={<CgDisplayFlex size={25} />} name="View Proposals" />
        <div onClick={viewReports}>
          <Pop icon={<MdReportProblem size={25} />} name="Reports" />
        </div>
      </div>
      <Wallet open={open} handleClose={handleClose} />
    </>
  );
};

const Pop = ({ icon, name }) => {
  return (
    <Whisper
      placement="top"
      trigger="hover"
      controlId="control-id-hover"
      className="border"
      speaker={
        <Popover>
          <span>{name}</span>
        </Popover>
      }>
      <IconButton
        size="lg"
        className="shadow-lg focus:outline-none border bg-white"
        icon={icon}
        circle
      />
    </Whisper>
  );
};

export default Navigation;
