import React, { useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { CgDisplayFlex } from "react-icons/cg";
import { BsWallet2, BsChatDots } from "react-icons/bs";
import {
  Button,
  IconButton,
  List,
  Modal,
  Panel,
  Placeholder,
  Popover,
  Whisper,
} from "rsuite";
import { GiWallet } from "react-icons/gi";
import cardPng from "../../../assets/images/card.png"

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div class="backdrop-blur-sm shadow-md bg-[#FEFCF3]/30 space-x-5 py-2.5 px-10 flex rounded-l-full rounded-r-full border border-double">
        <Pop
          icon={<AiOutlineAppstoreAdd size={25} />}
          name="Add Auction Item"
        />
        <Pop icon={<GrView size={25} />} name="View Listed Auctions" />
        <div onClick={handleOpen}>
          <Pop icon={<BsWallet2 size={25} />} name="Wallet" />
        </div>
        <Pop icon={<BsChatDots size={25} />} name="Chat" />
        <Pop icon={<CgDisplayFlex size={25} />} name="View Proposals" />
      </div>
      <WalletModel open={open} handleClose={handleClose} />
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
      }
    >
      <IconButton
        size="lg"
        className="shadow-lg border bg-white"
        icon={icon}
        circle
      />
    </Whisper>
  );
};

const WalletModel = ({ open, handleClose }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size="xs"
      style={{ marginRight: "30px" }}
      // onExit={handleClose}
    >
      <div className="space-y-5">
        <GiWallet className="mx-auto" size="50" />
        <div className="text-center">
          <p className="font-bold">Total Balance</p>
          <p className="font-mono text-xl">PKR 863123681</p>
        </div>
        <div className="flex space-x-3 items-center">
          {/* <Button onClick={handleClose} appearance="default" block>
            Add money
          </Button> */}
          <Button
            onClick={handleOpenAdd}
            style={{ backgroundColor: "#188796" }}
            appearance="primary"
            block
          >
            Add money
          </Button>
          <AddMoney open={openAdd} handleClose={handleCloseAdd} />
        </div>
        <Panel header="History" bordered>
          <List bordered autoScroll className="h-48">
            <List.Item>
              <div className="flex justify-between items-center text-xs">
                <span>Payment to xyz shop</span>
                <span className="text-red-500 font-semibold">-100 PKR</span>
              </div>
            </List.Item>
            <List.Item>
              <div className="flex justify-between items-center text-xs">
                <span>Payment to xyz shop</span>
                <span className="text-red-500 font-semibold">-150 PKR</span>
              </div>
            </List.Item>
            <List.Item>
              <div className="flex justify-between items-center text-xs">
                <span>Credit from abc shop</span>
                <span className="text-emerald-500 font-semibold">+300 PKR</span>
              </div>
            </List.Item>
            <List.Item>
              <div className="flex justify-between items-center text-xs">
                <span>Transfer from Ahmed</span>
                <span className="text-emerald-500 font-semibold">+100 PKR</span>
              </div>
            </List.Item>
            <List.Item>
              <div className="flex justify-between items-center text-xs">
                <span>Transfer from Abdullah</span>
                <span className="text-emerald-500 font-semibold">+500 PKR</span>
              </div>
            </List.Item>
          </List>
        </Panel>
      </div>
    </Modal>
  );
};

const AddMoney = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      size="xs"
      style={{ marginRight: "230px", marginTop: "50px" }}
    >
          <img src={cardPng} alt="card" />
          <main class="px-4">
            <h1 class="text-xl font-semibold text-gray-700 text-center">
              Adding Money from Card
            </h1>
            <div class="">
              <div class="my-3">
                <input
                  type="text"
                  class="block w-full px-5 py-3 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  placeholder="Card holder"
                  maxlength="22"
                  x-model="cardholder"
                />
              </div>
              <div class="my-3">
                <input
                  type="text"
                  class="block w-full px-5 py-3 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  placeholder="Card number"
                  x-model="cardNumber"
                  // x-on:keydown="format()"
                  // x-on:keyup="isValid()"
                  maxlength="19"
                />
              </div>
              <div class="my-3">
                <input
                  type="text"
                  class="block w-full px-5 py-3 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  placeholder="amount"
                />
              </div>
              <div class="mt-3 flex flex-col">
                <div class="mb-2">
                  <label for="" class="text-gray-700">
                    Expired
                  </label>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <select
                    name=""
                    id=""
                    class="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                    x-model="expired.month"
                  >
                    <option value="" selected disabled>
                      MM
                    </option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  <select
                    name=""
                    id=""
                    class="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                    x-model="expired.year"
                  >
                    <option value="" selected disabled>
                      YY
                    </option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                  <input
                    type="text"
                    class="block w-full col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                    placeholder="Security code"
                    maxlength="3"
                    x-model="securityCode"
                  />
                </div>
              </div>
            </div>
          </main>
          <footer class="mt-6 p-4">
            <Button
              onClick={handleClose}
              appearance="ghost"
              block
              style={{ color: "#188796", borderColor: "#188796" }}
            >
              Add money
            </Button>
          </footer>
    </Modal>
  );
};

export default Navigation;
