/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import { BsSearch, BsKeyboardFill } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import ServerAPI from '../../api/server';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Jdenticon from 'react-jdenticon';
import API from '../../api/server';
import { format } from 'timeago.js';
import {
  Button,
  ButtonToolbar,
  Modal,
  Placeholder,
  SelectPicker,
  Toggle,
  useToaster
} from 'rsuite';
import io from 'socket.io-client';
import Toaster from '../../components/Common/Toaster';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [clickedUser, setClickedUser] = useState();
  const [socket] = useState(io.connect('http://localhost:8080'));
  const scrollRef = useRef();
  const [auth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [modal, setModal] = useState(false);

  useEffect(() => {
    socket.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.uid,
        text: data.text,
        createdAt: Date.now()
      });
      console.log('message', data);
    });
  }, []);

  useEffect(() => {
    // console.log('arrival change', currentChat?.members, arrivalMessage);
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);

    // console.log('messages', messages);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit('sendUser', auth?.user._id);
    socket.on('getUsers', (users) => {
      console.log(users);
    });
  }, [auth.user]);

  useEffect(() => {
    const handleConversation = async () => {
      try {
        const response = await ServerAPI.get('/api/conversations/' + auth.user._id);
        // console.log('conversations', response.data);
        setConversations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    handleConversation();
  }, [auth.user._id]);

  useEffect(() => {
    const handleMessages = async () => {
      try {
        const response = await ServerAPI.get('/api/messages/' + currentChat?._id);
        // console.log('messages', response.data);
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const friendId = currentChat?.members?.find((c) => c !== auth?.user._id);
    const getUser = async () => {
      try {
        const res = await API.get('/api/users/check/' + friendId);
        setClickedUser(res.data);
      } catch (error) {
        if (friendId !== undefined) console.log(error);
      }
    };
    getUser();

    handleMessages();
  }, [currentChat?._id, auth.user._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    // e.preventDefault();
    // console.log(newMessage);
    const message = {
      conversationId: currentChat._id,
      sender: auth?.user._id,
      text: newMessage
    };

    socket.emit('sendMessage', {
      uid: auth?.user._id,
      rid: currentChat.members?.find((c) => c !== auth?.user._id),
      text: newMessage
    });

    try {
      const res = await API.post('/api/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
    (item) => ({ label: item, value: item })
  );

  // console.log('clicked', clickedUser);

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
            {/* <div className=''>
              <SelectPicker
                data={data}
                appearance="default"
                placeholder="Default"
                style={{ width: 224 }}
              />
            </div> */}
            <div className="pb-4 h-[76vh] overflow-y-scroll">
              {conversations?.map((c) => (
                <div key={c._id} onClick={() => setcurrentChat(c)}>
                  <ChatItem chat={c} logged_user={auth?.user} type={auth.type} />
                </div>
                // <ChatItem key={d.id} setList={setList} chat={d} />
              ))}
            </div>
          </div>
          <div className="flex-[7] flex justify-between flex-col border-l border-gray-400 h-[calc(100vh-18vh)] px-5">
            <div className="flex-grow flex flex-col">
              <div className="border rounded-3xl mb-2 p-5 flex items-center">
                {clickedUser ? (
                  <>
                    <Jdenticon size="48" value={clickedUser?.email} />
                    <div className="flex-grow ml-3">
                      <h6>{clickedUser?.name}</h6>
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
                {currentChat ? (
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

const ChatItem = ({ chat, logged_user, type }) => {
  // console.log('chat', chat);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = chat.members?.find((c) => c !== logged_user._id);
    const getUser = async () => {
      try {
        const res = await API.get('/api/users/check/' + friendId);
        setUser(res.data);
      } catch (error) {
        if (friendId !== undefined) console.log(error);
      }
    };
    getUser();
  }, [logged_user, chat]);

  // console.log(user);

  return (
    <div
      className={`flex items-center py-4 px-2 rounded-lg cursor-pointer hover:bg-primary/10 ${
        chat.border ? ' border-primary border-2' : 'border-2 border-white'
      }`}
      // onClick={() =>
      //   setList((prev) => {
      //     return prev.map((c) => {
      //       if (c.id === chat.id) {
      //         return { ...c, border: true };
      //       } else return { ...c, border: false };
      //     });
      //   })
      // }
    >
      <div>
        <Jdenticon size="48" value={user?.email} />
      </div>
      {/* <img src={chat.imageURL} alt="profile" className="w-14 h-14 bg-black rounded-full" /> */}
      <div className="flex-grow ml-3">
        <h6>{user?.name}</h6>
        <p className="text-xs uppercase font-semibold text-gray-400">{user?.type}</p>
      </div>
    </div>
  );
};

const Messages = ({ messages, user, clickedUser }) => {
  useEffect(() => {
    window.scrollTo({ bottom: 0, left: 0, behavior: 'smooth' });
  }, [messages]);

  // console.log(messages);

  return (
    <div className="h-full pb-10">
      {messages.length === 0 ? (
        <div className="flex justify-center items-center h-full text-4xl text-center font-bold text-gray-400">
          Haven&apos;t started conversation yet
        </div>
      ) : (
        messages?.map((m) => (
          <Message
            key={m._id}
            message={m}
            email={user.email}
            own={m.sender === user?._id}
            clickedUser={clickedUser}
          />
        ))
      )}
    </div>
  );
};

const Message = ({ own, message, email, clickedUser }) => {
  // console.log(name, message);
  return (
    <>
      {own ? (
        <div className="flex flex-col-reverse items-end justify-end mb-2">
          <div className="flex space-x-2 text-xs max-w-xs mx-2 order-1 items-end">
            <span className="px-4 py-2 rounded-lg inline-block bg-primary text-white ">
              {message.text}
            </span>
            {email && <Jdenticon size="26" value={email} />}
          </div>
          <span className="text-xs mr-11 mt-1">{format(message.createdAt)}</span>
        </div>
      ) : (
        <div className="flex flex-col-reverse mb-2">
          <div className="flex space-x-2 text-xs max-w-xs mx-2 order-2">
            {clickedUser?.email && <Jdenticon size="26" value={clickedUser?.email} />}
            <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
              {message.text}
            </span>
          </div>
          <span className="text-xs ml-11 mt-1">{format(message.createdAt)}</span>
        </div>
      )}
    </>
  );
};

const ConversationsModal = ({ open, setOpen, auth, setConversations }) => {
  const toaster = useToaster();
  const [select, setSelect] = useState(null);
  const [users, setUsers] = useState([]);

  const handleClose = async () => {
    if (select !== null) {
      const conversation = {
        sender_id: auth.user._id,
        receiver_id: select
      };
      try {
        // console.log(select);
        const res = await API.post('/api/conversations', conversation);
        console.log(res);
        setConversations((prev) => [...prev, res.data]);
        setSelect(null);
        Toaster(toaster, 'success', 'Conversation has been created');
      } catch (error) {}
    } else Toaster(toaster, 'error', 'No User has been selected');
    setOpen(false);
  };

  useEffect(() => {
    const getArtists = async () => {
      try {
        const res = await API.get(
          auth?.type === 'artist' ? '/api/users' : auth?.type === 'buyer' && '/api/artists'
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getArtists();
  }, []);

  // console.log('type', auth?.type);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Select a person to start conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {users?.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelect(user._id)}
              className="flex items-center px-10 transition-all ease-in-out cursor-pointer py-5 hover:bg-primary/10 rounded">
              <Jdenticon size="50" value={user?.email} />
              {/* <img src={chat.imageURL} alt="profile" className="w-14 h-14 bg-black rounded-full" /> */}
              <div className="flex-grow ml-3">
                <h6>{user?.name}</h6>
                <div className="text-xs uppercase font-semibold text-gray-400">
                  {auth.type === 'buyer' ? 'Artist' : 'buyer'}
                </div>
              </div>
            </div>
          ))}
          {/* <Placeholder.Paragraph rows={80} /> */}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="flex items-center justify-center rounded-2xl shadow-md px-3 py-2 bg-primary text-white font-medium text-sm leading-snug hover:bg-cyan-700 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full cursor-pointer"
            onClick={handleClose}>
            Start Conversation
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Chat;
