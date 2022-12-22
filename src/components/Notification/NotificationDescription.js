import React from 'react';
import { Dropdown } from 'rsuite';

export default function NotificationDescription() {
  return (
    <Dropdown.Item eventKey={Math.floor(Math.random() * 9999)} className="hover:shadow-xl">
      <div className="flex flex-col text-center items-center sm:text-left sm:flex-row p-5 gap-2">
        <div className=" flex-shrink-0 overflow-hidden h-14 w-14 rounded-full">
          <img
            className="  h-full object-cover w-full"
            src="https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-face_171337-2887.jpg?w=2000"
            alt=""
          />
        </div>
        <div className="md:text-justify flex flex-col gap-1 pt-1">
          <p className="text-sm">
            {' '}
            <span className="font-bold text-teal-800">Musa Malik</span> has sent you a message.
          </p>
          <p className="font-extralight">4 hours ago</p>
        </div>
      </div>
    </Dropdown.Item>
  );
}
