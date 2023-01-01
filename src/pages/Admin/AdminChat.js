/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { BsSearch, BsKeyboardFill } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import API from '../../utils/unsplash';
import AdminLayout from '../../components/Layouts/AdminLayout';

const AdminChat = () => {
  const [data, setPeopleResponse] = useState(null);

  useEffect(() => {
    API.search
      .getPhotos({ query: 'gentlemen women' })
      .then((res) => {
        setPeopleResponse(res.response.results);
      })
      .catch(() => {
        console.log('something went wrong!');
      });
  }, []);

  return (
    <AdminLayout title={'Chat'}>
      <div className="h-screen overflow-hidden mb-10">
        <HeaderLayout title="Chat" />
        <div className="px-5 flex h-full">
          <div className="w-96 mx-5 overflow-y-scroll scrollbar-hide relative">
            <div className="pb-4 bg-white sticky top-0">
              <div className="flex items-center space-x-4 border px-3 py-2 rounded-3xl">
                <BsSearch />
                <input placeholder="Search" className="border-0 text-sm outline-0 flex-grow" />
              </div>
            </div>
            <div className="pb-4 h-[76vh] overflow-y-scroll">
              {data?.map((d) => (
                <ChatItem key={d.id} chat={d} />
                // <ChatItem key={d.id} setList={setList} chat={d} />
              ))}
            </div>
          </div>
          <div className="flex-grow flex justify-between flex-col border-l border-gray-400 h-[calc(100vh-18vh)] px-5">
            <div className="flex-grow flex flex-col">
              <div className="border rounded-3xl mb-2 p-5 flex items-center">
                <img
                  src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
                  alt="profile"
                  className="w-14 h-14 bg-black rounded-full"
                />
                <div className="flex-grow ml-3">
                  <h6>Doe</h6>
                  <p>description</p>
                </div>
              </div>
              <div className="border rounded-3xl mb-2 p-5 h-[calc(100vh-36vh)] flex-grow overflow-y-scroll">
                <Sender />
                <Receiver />
                <Sender />
                <Receiver />
                <Sender />
                <Receiver />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-4 border px-3 py-2 rounded-3xl">
                <BsKeyboardFill size={20} />
                <input
                  className="flex-grow border-0 text-sm outline-0"
                  placeholder="Enter Message"
                />
                <BiSend size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const ChatItem = ({ chat }) => {
  return (
    <div
      className={`flex items-center py-4 px-2 rounded-lg cursor-pointer ${
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
      <img src={chat.urls.regular} alt="profile" className="w-14 h-14 bg-black rounded-full" />
      <div className="flex-grow ml-3">
        <h6>{chat.user.name}</h6>
        <p>{chat.alt_description.substring(0, 30)}...</p>
      </div>
      <p className="font-bold text-gray-600">09:00 am</p>
    </div>
  );
};

const Receiver = () => {
  return (
    <div className="flex items-end justify-end">
      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
        <ReceiverItem text="Are you using sudo?" />
        <ReceiverItem
          text="Run this command sudo chown -R `whoami` /Users/
            username/.npm-global/ then install the package globally without
            using sudo"
        />
      </div>
      <img
        src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
        alt="My profile"
        className="w-6 h-6 rounded-full order-2"
      />
    </div>
  );
};

const Sender = () => {
  return (
    <div className="flex items-end">
      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
        <SenderItem text="Command was run with root privileges. I'm sure about that." />
        <SenderItem text="I've update the description so it's more obviously now" />
        <SenderItem text="FYI https://askubuntu.com/a/700266/510172" />
        <SenderItem
          text="Check the line above (it ends with a # so, I'm running it as root )"
          pre="true"
          pretext="# npm install -g @vue/devtools"
        />
      </div>
      <img
        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
        alt="My profile"
        className="w-6 h-6 rounded-full order-1"
      />
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

export default AdminChat;
