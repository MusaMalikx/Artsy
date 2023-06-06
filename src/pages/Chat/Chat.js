/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import { BsSearch, BsKeyboardFill } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ReactJdenticon from 'react-jdenticon';
import API from '../../api/server';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Modal, Placeholder, useToaster } from 'rsuite';
import Toaster from '../../components/Common/Toaster';
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { ClipLoader } from 'react-spinners';
import { v4 as uuid } from 'uuid';
import { format } from 'timeago.js';

/*
This React component handles the chat functionality, allowing users to send and receive messages in real-time. 
It utilizes state management and event handling to update the chat interface dynamically. 
*/
const Chat = () => {
  const [auth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [clickedUser, setClickedUser] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'userChats', auth?.user.firebaseid), (doc) => {
      setConversations(doc.data() && Object.entries(doc.data()));
    });

    return () => {
      unsub();
    };
  }, [auth?.user.firebaseid]);

  useEffect(() => {
    //API call to get user messages from firebase
    const getMessages = () => {
      onSnapshot(doc(db, 'chats', clickedUser?.cid), (doc) => {
        setMessages(doc.data().messages);
      });
    };

    clickedUser && getMessages();
  }, [clickedUser?.cid]);

  //API call for sending messages
  const handleSend = async () => {
    await updateDoc(doc(db, 'chats', clickedUser?.cid), {
      messages: arrayUnion({
        id: uuid(),
        text: newMessage,
        sid: auth?.user.firebaseid,
        date: Timestamp.now()
      })
    });

    //API call for getting last message
    await updateDoc(doc(db, 'userChats', auth?.user.firebaseid), {
      [clickedUser?.cid + '.lastMessage']: {
        text: newMessage
      },
      [clickedUser?.cid + '.date']: serverTimestamp()
    });

    await updateDoc(doc(db, 'userChats', clickedUser?.userInfo.uid), {
      [clickedUser?.cid + '.lastMessage']: {
        text: newMessage
      },
      [clickedUser?.cid + '.date']: serverTimestamp()
    });

    setNewMessage('');
  };

  return (
    <Layout title={'Chat'}>
      <div className="h-screen overflow-hidden mb-10">
        <HeaderLayout title="Chat" />
        <div className="px-5 flex h-full">
          <div className="w-96 flex-[3] mx-5 overflow-y-scroll scrollbar-hide relative">
            <div className="pb-4 bg-white sticky top-0 d-flex items-center space-y-2">
              <div className="flex items-center space-x-4 border px-3 py-1 rounded-3xl">
                <BsSearch />
                <input placeholder="Search" className="border-0 text-sm outline-0 flex-grow py-2" />
              </div>
              <div
                onClick={() => setModal(true)}
                className="flex items-center justify-center rounded-2xl shadow-md px-3 py-2 bg-primary text-white font-medium text-sm leading-snug hover:bg-cyan-700 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full cursor-pointer">
                <AiOutlineUserAdd />
                <p className="ml-2">Start Conversation</p>
              </div>
            </div>
            <div className="pb-4 h-[76vh] overflow-y-scroll">
              {conversations
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((c) => (
                  <div
                    key={c[0]}
                    onClick={() =>
                      setClickedUser({
                        ...c[1],
                        cid:
                          auth?.user.firebaseid > c[1].userInfo.uid
                            ? auth?.user.firebaseid + c[1].userInfo.uid
                            : c[1].userInfo.uid + auth?.user.firebaseid
                      })
                    }>
                    <ChatItem chat={c[1]} logged_user={auth?.user} type={auth.usertype} />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex-[7] flex justify-between flex-col border-l border-gray-400 h-[calc(100vh-18vh)] px-5">
            <div className="flex-grow flex flex-col">
              <div className="border rounded-3xl mb-2 p-5 flex items-center">
                {clickedUser ? (
                  <>
                    <ReactJdenticon size="48" value={clickedUser?.userInfo.email} />
                    <div className="flex-grow ml-3">
                      <h6>{clickedUser?.userInfo.name}</h6>
                      <p className="text-xs uppercase font-semibold text-gray-400">
                        {clickedUser?.type}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Placeholder.Paragraph graph="circle" />
                    <div className="flex-grow ml-3">
                      <Placeholder.Paragraph />
                    </div>
                  </>
                )}
              </div>
              <div className="border rounded-3xl mb-2 p-5 h-[calc(100vh-36vh)] flex-grow overflow-y-scroll">
                {clickedUser ? (
                  <Messages messages={messages} user={auth?.user} clickedUser={clickedUser} />
                ) : (
                  <span className="flex justify-center items-center h-full text-4xl text-center font-bold text-gray-400">
                    Open a Conversation to start a chat
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-4 border px-3 py-2 rounded-3xl">
                <BsKeyboardFill size={20} />
                <input
                  className="flex-grow border-0 text-sm outline-0"
                  placeholder="Enter Message"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  onKeyDown={(e) => e.code === 'Enter' && handleSend()}
                />
                <BiSend size={20} onClick={handleSend} cursor="pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConversationsModal
        open={modal}
        setOpen={setModal}
        auth={auth}
        setConversations={setConversations}
      />
    </Layout>
  );
};

//Renders a single user chat item from chat list
const ChatItem = ({ chat }) => {
  return (
    <div
      className={`flex items-center py-4 px-2 rounded-lg cursor-pointer hover:bg-primary/10 ${
        chat?.border ? ' border-primary border-2' : 'border-2 border-white'
      }`}>
      <div>
        <ReactJdenticon size="48" value={chat?.userInfo.email} />
      </div>
      <div className="flex-grow ml-3">
        <h6>{chat?.userInfo.name}</h6>
        <p className="text-xs font-semibold text-gray-400">
          {chat?.lastMessage ? chat?.lastMessage?.text.substring(0, 20) + '...' : ''}
        </p>
      </div>
    </div>
  );
};

/*
This React component is responsible for rendering a popup message to select user to begin a chat. 
*/
const Messages = ({ messages, user, clickedUser }) => {
  useEffect(() => {
    window.scrollTo({ bottom: 0, left: 0, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full pb-10">
      {messages?.length === 0 ? (
        <div className="flex justify-center items-center h-full text-4xl text-center font-bold text-gray-400">
          Haven&apos;t started conversation yet
        </div>
      ) : (
        messages?.map((m) => (
          <Message
            key={m.id}
            message={m}
            email={user.email}
            own={m.sid === user?.firebaseid}
            clickedUser={clickedUser}
          />
        ))
      )}
    </div>
  );
};

/*
This React component is responsible for rendering a message in the chatbox. 
*/
const Message = ({ own, message, email, clickedUser }) => {
  return (
    <>
      {own ? (
        <div className="flex flex-col-reverse items-end justify-end mb-2">
          <div className="flex space-x-2 text-xs max-w-xs mx-2 order-1 items-end">
            <span className="px-4 py-2 rounded-lg inline-block bg-primary text-white ">
              {message.text}
            </span>
            {email && <ReactJdenticon size="26" value={email} />}
          </div>
          <span className="text-xs mr-11 mt-1">{format(message.date.toDate())}</span>
        </div>
      ) : (
        <div className="flex flex-col-reverse mb-2">
          <div className="flex space-x-2 text-xs max-w-xs mx-2 order-2">
            {clickedUser?.userInfo.email && (
              <ReactJdenticon size="26" value={clickedUser?.userInfo.email} />
            )}
            <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
              {message.text}
            </span>
          </div>
          <span className="text-xs ml-11 mt-1">{format(message.date.toDate())}</span>
        </div>
      )}
    </>
  );
};

/*
This React component is responsible for rendering a user selection feature and displaying previous chat conversations. 
It efficiently handles the user interface and provides a seamless experience for users to navigate through their chat history.
*/
const ConversationsModal = ({ open, setOpen, auth }) => {
  const toaster = useToaster();
  const [select, setSelect] = useState(null);
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (select !== null) {
      const combineId =
        auth?.user.firebaseid > select.firebaseid
          ? auth?.user.firebaseid + select.firebaseid
          : select.firebaseid + auth?.user.firebaseid;

      console.log('combine', combineId);

      try {
        //API call for getting user chats
        const res = await getDoc(doc(db, 'chats', combineId));

        if (!res.exists()) {
          await setDoc(doc(db, 'chats', combineId), { messages: [] });
          const res1 = await getDoc(doc(db, 'userChats', auth?.user.firebaseid));
          const res2 = await getDoc(doc(db, 'userChats', select?.firebaseid));

          if (res1.exists()) {
            await updateDoc(doc(db, 'userChats', auth.user.firebaseid), {
              [combineId + '.userInfo']: {
                uid: select?.firebaseid,
                name: select?.name,
                imageURL: select?.imageURL,
                email: select?.email
              },
              [combineId + '.date']: serverTimestamp()
            });
          } else {
            await setDoc(doc(db, 'userChats', auth.user.firebaseid), {
              [combineId]: {
                userInfo: {
                  uid: select?.firebaseid,
                  name: select?.name,
                  imageURL: select?.imageURL,
                  email: select?.email
                },
                date: serverTimestamp()
              }
            });
          }

          if (res2.exists()) {
            await updateDoc(doc(db, 'userChats', select?.firebaseid), {
              [combineId + '.userInfo']: {
                uid: auth.user.firebaseid,
                name: auth?.user?.name,
                imageURL: auth?.user?.imageURL,
                email: auth?.user?.email
              },
              [combineId + '.date']: serverTimestamp()
            });
          } else {
            await setDoc(doc(db, 'userChats', select?.firebaseid), {
              [combineId]: {
                userInfo: {
                  uid: auth.user.firebaseid,
                  name: auth?.user?.name,
                  imageURL: auth?.user?.imageURL,
                  email: auth?.user?.email
                },
                date: serverTimestamp()
              }
            });

            handleClose();
            Toaster(toaster, 'success', 'Conversation has been created');
          }
        } else {
          Toaster(toaster, 'warning', 'Conversation has already been created');
          console.log('res', res.data());
        }
        setSelect(null);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    } else Toaster(toaster, 'error', 'No User has been selected');
  };

  useEffect(() => {
    //API call for getting artist list
    const getArtists = async () => {
      try {
        const res = await API.get(
          auth?.usertype === 'artist' ? '/api/users' : auth?.usertype === 'buyer' && '/api/artists'
        );

        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getArtists();
  }, []);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Select a person to start conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {users.length > 0 &&
            users?.map(
              (user) =>
                !user.isAdmin && (
                  <div
                    key={user._id}
                    onClick={() => setSelect(user)}
                    className={`flex items-center border px-10 transition-all ease-in-out cursor-pointer py-5 hover:bg-primary/10 rounded ${
                      select?._id === user._id ? 'border-primary' : 'border-white'
                    }`}>
                    <ReactJdenticon size="50" value={user?.email} />
                    <div className="flex-grow ml-3">
                      <h6>{user?.name}</h6>
                      <div className="text-xs uppercase font-semibold text-gray-400">
                        {auth.usertype === 'buyer' ? 'Artist' : 'buyer'}
                      </div>
                    </div>
                  </div>
                )
            )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="flex items-center justify-center rounded-2xl shadow-md px-3 py-2 bg-primary text-white font-medium text-sm leading-snug hover:bg-cyan-700 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full cursor-pointer"
            onClick={handleSelect}>
            {loader && <ClipLoader size={20} color="#fff" className="mr-2" />}
            Start Conversation
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Chat;
