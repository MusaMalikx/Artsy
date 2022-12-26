import React, { useState } from 'react';
import { GiWallet } from 'react-icons/gi';
import { Button, List, Modal, Panel } from 'rsuite';
import AddMoney from './AddMoney';

const Wallet = ({ open, handleClose }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size="xs"
      style={{ marginRight: '30px' }}
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
            style={{ backgroundColor: '#188796' }}
            appearance="primary"
            block>
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

export default Wallet;
