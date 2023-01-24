/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import { BsSearch, BsKeyboardFill } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
// import API from '../../utils/unsplash';
import ServerAPI from '../../api/server';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../redux/features/reducer/userReducer';
import Jdenticon from 'react-jdenticon';
import API from '../../api/server';
import { format } from 'timeago.js';
import { Placeholder } from 'rsuite';
import { io } from 'socket.io-client';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [clickedUser, setClickedUser] = useState();
  const socket = useRef();
  const scrollRef = useRef();
  // const [data, setPeopleResponse] = useState(null);
  const [auth] = useState(JSON.parse(localStorage.getItem('auth')));
  // const users = useSelector(selectUsers);
  // console.log(users);

  // console.log('arrival', arrivalMessage);

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
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
    socket.current.emit('sendUser', auth?.user._id);
    socket.current.on('getUsers', (users) => {
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

    const friendId = currentChat?.members.find((c) => c !== auth?.user._id);
    const getUser = async () => {
      try {
        const res = await API.get('/api/users/find/' + friendId);
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

    socket.current.emit('sendMessage', {
      uid: auth?.user._id,
      rid: currentChat.members.find((c) => c !== auth?.user._id),
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

  // console.log('current', currentChat);
  // console.log('click', clickedUser);

  return (
    <Layout title={'Chat'}>
      <div className="h-screen overflow-hidden mb-10">
        <HeaderLayout title="Chat" />
        <div className="px-5 flex h-full">
          <div className="w-96 flex-[3] mx-5 overflow-y-scroll scrollbar-hide relative">
            <div className="pb-4 bg-white sticky top-0 d-flex items-center space-y-2">
              <div className="flex items-center space-x-4 border px-3 py-2 rounded-3xl">
                <BsSearch />
                <input placeholder="Search" className="border-0 text-sm outline-0 flex-grow py-2" />
              </div>
              <div className="flex items-center justify-center rounded-2xl shadow-md px-3 py-2 bg-primary text-white font-medium text-sm leading-snug hover:bg-cyan-700 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full cursor-pointer">
                <AiOutlineUserAdd />
                <p className="ml-2">Add User</p>
              </div>
            </div>
            <div className="pb-4 h-[76vh] overflow-y-scroll">
              {conversations?.map((c) => (
                <div key={c._id} onClick={() => setcurrentChat(c)}>
                  <ChatItem chat={c} logged_user={auth?.user} />
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
                    <Jdenticon size="48" value={clickedUser?.name} />
                    <div className="flex-grow ml-3">
                      <h6>{clickedUser?.name}</h6>
                      <p>description</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Placeholder.Paragraph graph="circle" />
                    <div className="flex-grow ml-3">
                      {/* <Placeholder.Paragraph graph="square" /> */}
                      <Placeholder.Paragraph />
                    </div>
                  </>
                )}
              </div>
              <div className="border rounded-3xl mb-2 p-5 h-[calc(100vh-36vh)] flex-grow overflow-y-scroll">
                {currentChat ? (
                  <>
                    {messages?.map((m) => (
                      <Message
                        key={m._id}
                        message={m}
                        name={auth?.user.name}
                        own={m.sender === auth?.user?._id}
                      />
                    ))}
                  </>
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
    </Layout>
  );
};

const ChatItem = ({ chat, logged_user }) => {
  // console.log('chat', chat);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = chat.members.find((c) => c !== logged_user._id);
    const getUser = async () => {
      try {
        const res = await API.get('/api/users/find/' + friendId);
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
        <Jdenticon size="48" value={user?.name} />
      </div>
      {/* <img src={chat.imageURL} alt="profile" className="w-14 h-14 bg-black rounded-full" /> */}
      <div className="flex-grow ml-3">
        <h6>{user?.name}</h6>
        {/* <p>{chat.alt_description.substring(0, 30)}...</p> */}
      </div>
      {/* <p className="font-bold text-gray-600">09:00 am</p> */}
    </div>
  );
};

const Message = ({ own, message, name }) => {
  // console.log(name, message);
  return (
    <>
      {own ? (
        <div className="flex flex-col-reverse items-end justify-end mb-2">
          <div className="flex space-x-2 text-xs max-w-xs mx-2 order-1 items-end">
            <span className="px-4 py-2 rounded-lg inline-block bg-primary text-white ">
              {message.text}
            </span>
            {name && <Jdenticon size="26" value={name} />}
          </div>
          <span className="text-xs mr-11 mt-1">{format(message.createdAt)}</span>
        </div>
      ) : (
        <div className="flex flex-col-reverse mb-2">
          <div className="flex space-x-2 text-xs max-w-xs mx-2 order-2">
            {name && <Jdenticon size="26" value={name} />}
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

const Receiver = ({ message, name }) => {
  return (
    <div className="flex flex-col-reverse items-end justify-end mb-2">
      <div className="flex space-x-2 text-xs max-w-xs mx-2 order-1 items-end">
        <ReceiverItem text={message.text} />
        {name && <Jdenticon size="26" value={name} />}
        {/* <ReceiverItem
          text="Run this command sudo chown -R `whoami` /Users/
            username/.npm-global/ then install the package globally without
            using sudo"
        /> */}
      </div>
      <span className="text-xs mr-11 mt-1">{format(message.createdAt)}</span>
      {/* <img
        src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
        alt="My profile"
        className="w-6 h-6 rounded-full order-2"
      /> */}
    </div>
  );
};

const Sender = ({ message, name }) => {
  // console.log(message);
  return (
    <div className="flex flex-col-reverse mb-2">
      <div className="flex space-x-2 text-xs max-w-xs mx-2 order-2">
        {name && <Jdenticon size="26" value={name} />}
        <SenderItem text={message.text} />
        <SenderItem text="I've update the description so it's more obviously now" />
        <SenderItem text="FYI https://askubuntu.com/a/700266/510172" />
        <SenderItem
          text="Check the line above (it ends with a # so, I'm running it as root )"
          pre="true"
          pretext="# npm install -g @vue/devtools"
        />
      </div>
      <span className="text-xs ml-11 mt-1">{format(message.createdAt)}</span>
      {/* <img
        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
        alt="My profile"
        className="w-6 h-6 rounded-full order-1"
      /> */}
    </div>
  );
};

const ReceiverItem = ({ text }) => {
  return (
    <div>
      <span className="px-4 py-2 rounded-lg inline-block bg-primary text-white ">{text}</span>
    </div>
  );
};

const SenderItem = ({ text, pre, pretext }) => {
  return (
    <div>
      <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
        {text} {pre && <pre>{pretext}</pre>}
      </span>
    </div>
  );
};

export default Chat;
