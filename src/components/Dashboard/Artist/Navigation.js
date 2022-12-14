import React from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { CgDisplayFlex } from "react-icons/cg";
import { BsWallet2, BsChatDots } from "react-icons/bs";
import { IconButton, Popover, Whisper } from "rsuite";

const Navigation = () => {
  return (
    <div class="backdrop-blur-sm shadow-md bg-[#FEFCF3]/30 space-x-5 py-2.5 px-10 rounded-l-full rounded-r-full border border-double">
      <Pop icon={<AiOutlineAppstoreAdd size={25} />} name="Add Auction Item" />
      <Pop icon={<GrView size={25} />} name="View Listed Auctions" />
      <Pop icon={<BsWallet2 size={25} />} name="Wallet" />
      <Pop icon={<BsChatDots size={25} />} name="Chat" />
      <Pop icon={<CgDisplayFlex size={25} />} name="View Proposals" />
    </div>
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
      }
    >
      <IconButton size="lg" className="shadow-lg border bg-white" icon={icon} circle />
    </Whisper>
  );
};

export default Navigation;
