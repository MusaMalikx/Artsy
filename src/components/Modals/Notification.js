import React, { useEffect, useState } from 'react';
import { Modal, useToaster } from 'rsuite';
import './style/Notification.css';
// import NotificationDescription from './Description/NotificationDescription';
import { BsPlusCircle } from 'react-icons/bs';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { v4 as uuid } from 'uuid';
import { sentence } from 'txtgen';
import Toaster from '../Common/Toaster';
import { format } from 'timeago.js';
import { sendNotification } from '../../helpers/notifications';
import Lottie from 'react-lottie-player';
import listLoading from '../../assets/json/emptyNotification';

export default function Notification({ isOpen, handleClose }) {
  const [auth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [notifications, setNotifications] = useState([]);
  const toaster = useToaster();

  // console.log(notifications);

  const getNotifications = () => {
    onSnapshot(doc(db, 'notify', auth?.user.firebaseid), (doc) => {
      setNotifications(doc.data().notifications);
    });
  };

  useEffect(() => {
    const createNotificatons = async () => {
      try {
        const res = await getDoc(doc(db, 'notify', auth?.user.firebaseid));
        if (!res.exists()) {
          await setDoc(doc(db, 'notify', auth?.user.firebaseid), { notifications: [] });
          getNotifications();
        } else {
          getNotifications();
        }
      } catch (error) {
        console.log(error);
      }
    };

    createNotificatons();
  }, []);

  // useEffect(() => {
  //   getNotifications();
  // });

  const addNotifications = async () => {
    // await updateDoc(doc(db, 'notify', auth?.user.firebaseid), {
    //   notifications: arrayUnion({
    //     id: uuid(),
    //     text: sentence(),
    //     date: Timestamp.now()
    //   })
    // });
    await sendNotification(auth?.user.firebaseid, uuid(), sentence());
    Toaster(toaster, 'success', 'Notification has been sent');
    getNotifications();
  };

  return (
    <Modal
      style={{ marginLeft: '32px', marginTop: '80px' }}
      id="notification-container"
      size="xs"
      open={isOpen}
      onClose={handleClose}
      title="Notifications"
      placement="rightStart">
      <Modal.Title className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <p>Notifications</p>
          <div
            className="bg-primary text-white w-7 h-7 rounded flex justify-center items-center cursor-pointer"
            onClick={addNotifications}>
            <BsPlusCircle />
          </div>
        </div>
      </Modal.Title>
      <Modal.Body className=" w-full h-96 overflow-hidden overflow-y-scroll">
        {notifications?.length === 0 ? (
          <EmptyNotifications />
        ) : (
          <>
            {notifications
              ?.sort((a, b) => b.date - a.date)
              .map((notify) => (
                <NotificationMessage key={notify.id} notify={notify} />
              ))}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

const EmptyNotifications = () => {
  return (
    <div className="w-full p-20 relative h-full flex flex-col justify-center items-center">
      <div className="text-center w-full whitespace-nowrap">
        <p className="text-lg text-red-500 font-semibold">No Notification!</p>
        <p className=" text-center">You have no notifications at the moment.</p>
      </div>
      <div className="w-56 pt-8">
        <Lottie play animationData={listLoading} loop />
      </div>
    </div>
  );
};

const NotificationMessage = ({ notify }) => {
  // console.log(notify);
  return (
    <div className="hover:shadow-xl hover:bg-slate-100 hover:scale-95 cursor-pointer transition-all ease-in-out py-2 px-5 mb-1">
      <p className="font-extralight text-sm text-slate-500 text-justify">{notify.text}</p>
      <p className="font-bold text-teal-800">{format(notify.date.toDate())}</p>
    </div>
  );
};
