import React from 'react';

/* 
Component responsible for displaying the description of a notification
*/
export default function NotificationDescription() {
  return (
    <div className="hover:shadow-xl hover:bg-slate-100 hover:scale-95 cursor-pointer">
      <div className="flex flex-col  text-center items-center sm:text-left sm:flex-row p-5 gap-2">
        <div className=" flex-shrink-0 overflow-hidden h-14 w-14 rounded-full">
          <img
            className="  h-full object-cover w-full"
            src="https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-face_171337-2887.jpg?w=2000"
            alt=""
          />
        </div>
        <div className="md:text-justify flex flex-col gap-1 pt-1">
          <p className="text-sm text-slate-500">
            {' '}
            <span className="font-bold text-teal-800">Musa Malik</span> has sent you a message.
          </p>
          <p className="font-extralight text-slate-500">4 hours ago</p>
        </div>
      </div>
    </div>
  );
}
