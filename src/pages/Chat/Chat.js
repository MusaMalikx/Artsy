import React, { useState } from "react";
import Layout from "../../components/Layouts/ArticleLayout";
import { BsSearch, BsKeyboardFill } from "react-icons/bs";
import { BiSend } from "react-icons/bi";

const Chat = ({ data }) => {
  const [list, setList] = useState([
    {
      id: 1,
      border: true,
    },
    {
      id: 2,
      border: false,
    },
    {
      id: 3,
      border: false,
    },
    {
      id: 4,
      border: false,
    },
    {
      id: 5,
      border: false,
    },
    {
      id: 6,
      border: false,
    },
    {
      id: 7,
      border: false,
    },
    {
      id: 8,
      border: false,
    },
    {
      id: 9,
      border: false,
    },
    {
      id: 10,
      border: false,
    },
    {
      id: 11,
      border: false,
    },
    {
      id: 12,
      border: false,
    },
    {
      id: 13,
      border: false,
    },
  ]);

  return (
    <Layout title={"Chat"}>
      <div className="h-screen overflow-hidden">
        <div className="pt-10 px-5">
          <p className="font-semibold font-serif text-2xl lg:text-4xl">Chat</p>
          <hr />
        </div>
        <div className="px-5 flex h-full">
          <div className="w-96 mx-5 overflow-y-scroll scrollbar-hide relative">
            <div className="pb-4 bg-white sticky top-0">
              <div className="flex items-center space-x-4 border px-3 py-2 rounded-3xl">
                <BsSearch />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none flex-grow"
                />
              </div>
            </div>
            <div className="pb-4">
              {list.map((chat) => (
                <ChatItem key={chat.id} setList={setList} chat={chat} />
              ))}
            </div>
          </div>
          <div className="flex-grow flex justify-between flex-col border-l border-gray-400 h-[calc(100vh-18vh)] px-5">
            <div className="flex-grow flex flex-col">
              <div className="border rounded-3xl mb-2 p-5 flex items-center">
                <div className="w-14 h-14 bg-black rounded-full" />
                <div className="flex-grow ml-3">
                  <h6>Doe</h6>
                  <p>description</p>
                </div>
              </div>
              <div className="border rounded-3xl mb-2 p-5 flex-grow">

              </div>
            </div>
            <div>
              <div className="flex items-center space-x-4 border px-3 py-2 rounded-3xl">
                <BsKeyboardFill size={20} />
                <input
                  type="text"
                  placeholder="Enter Text"
                  className="outline-none flex-grow"
                />
                <BiSend size={20} />
              </div>
            </div>
          </div>
          {/* <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 border px-3 py-2 rounded-3xl">
            <BsSearch />
            <input type="text" placeholder="Search" className="outline-none" />
          </div>
          <div>
            <button className="uppercase border border-black px-4 py-2 rounded">Clear chat</button>
          </div>
        </div> */}
        </div>
      </div>
    </Layout>
  );
};

const ChatItem = ({ setList, chat }) => {
  return (
    <div
      className={`flex items-center py-4 px-2 rounded-lg cursor-pointer ${
        chat.border ? " border-black border-2" : "border-2 border-white"
      }`}
      onClick={() =>
        setList((prev) => {
          return prev.map((c) => {
            if (c.id === chat.id) {
              return { ...c, border: true };
            } else return { ...c, border: false };
          });
        })
      }
    >
      <div className="w-14 h-14 bg-black rounded-full" />
      <div className="flex-grow ml-3">
        <h6>Doe</h6>
        <p>description</p>
      </div>
      <p className="font-bold text-gray-600">09:00 am</p>
    </div>
  );
};

export default Chat;
