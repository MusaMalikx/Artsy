import React, { useEffect, useState } from 'react';
import { GiWallet } from 'react-icons/gi';
import { Button, List, Modal, Panel } from 'rsuite';
import AddMoney from './AddMoney';
import API from '../../../api/server';
import keygen from 'keygenerator';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/features/reducer/userReducer';

const Wallet = ({ open, handleClose }) => {
  const user = useSelector(selectUser);
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [walletInfo, setWalletInfo] = useState({
    Amount: 0,
    Transactions: []
  });
  const fetchBalanceBuyer = async () => {
    const res = await API.get('/api/users/wallet', {
      headers: {
        token: 'Bearer ' + auth.token
      }
    });
    if (res.data) {
      setWalletInfo({
        Amount: res.data.Amount,
        Transactions: res.data.Transactions
      });
    }
  };

  const fetchBalanceArtist = async () => {
    const res = await API.get('/api/artists/wallet', {
      headers: {
        token: 'Bearer ' + auth.token
      }
    });
    if (res.data) {
      setWalletInfo({
        Amount: res.data.Amount,
        Transactions: res.data.Transactions
      });
    }
  };

  useEffect(() => {
    if (user.buyer) fetchBalanceBuyer();
    else if (user.artist) fetchBalanceArtist();
  }, []);

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
          <p className="font-mono text-xl">PKR {walletInfo.Amount}</p>
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
          <AddMoney
            setNewAmount={() => {
              if (user.buyer) fetchBalanceBuyer();
              else if (user.artist) fetchBalanceArtist();
            }}
            open={openAdd}
            handleClose={handleCloseAdd}
          />
        </div>
        <Panel header="History" bordered>
          <List bordered autoScroll className="h-48">
            {walletInfo.Transactions.map((t) => {
              return (
                <List.Item key={keygen._()}>
                  <div className="flex justify-between items-center text-xs">
                    {t.sent === true ? (
                      <>
                        <span>Payment to {t.userName}</span>
                        <span className="text-red-500 font-semibold">-{t.Amount} PKR</span>
                      </>
                    ) : (
                      <>
                        <span>Received from {t.userName} </span>
                        <span className="text-green-500 font-semibold">+{t.Amount} PKR</span>
                      </>
                    )}
                  </div>
                </List.Item>
              );
            })}
          </List>
        </Panel>
      </div>
    </Modal>
  );
};

export default Wallet;
