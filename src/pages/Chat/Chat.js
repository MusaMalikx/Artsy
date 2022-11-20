import React, { useState } from "react";
import Layout from "../../components/Layouts/ArticleLayout";
import { BsSearch } from "react-icons/bs";

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
  ]);

  return (
    <Layout title={"Chat"}>
      <div className="min-h-screen">
        <div className="pt-10 px-5">
          <p className="font-semibold font-serif text-2xl lg:text-4xl">Chat</p>
          <hr />
        </div>
        <div className="px-5 flex h-full">
          <div className="w-96 mx-5">
            <div className="flex items-center space-x-4 border px-3 py-2 rounded-3xl">
              <BsSearch />
              <input
                type="text"
                placeholder="Search"
                className="outline-none flex-grow"
              />
            </div>
            <div className="pt-4 overflow-y-scroll">
              {list.map((chat) => (
                <ChatItem
                  key={chat.id}
                  setList={setList}
                  id={chat.id}
                  border={chat.border}
                  chat={chat}
                />
              ))}
            </div>
          </div>
          <div className="flex-grow border-l border-gray-400 px-5">right</div>
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

const ChatItem = ({ border, setBorder, list, setList, chat, id }) => {
  return (
    <div
      className={`flex items-center py-4 px-2 rounded-lg cursor-pointer border-b-2 ${
        border && " border-black border-2"
      }`}
      onClick={
        () => console.log(chat.id)
        // setList((datas) => ({
        //   ...datas,
        //   [chat.id]: true,
        // }))
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
