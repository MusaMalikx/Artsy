import React, { useEffect, useState } from 'react';
const AuctionCardTimer = ({ endDate }) => {
  const [timer, setTimer] = useState({
    start: true,
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const date1 = new Date(endDate);
      const date2 = new Date();
      if (date1 - date2 > 0) {
        const diffInSeconds = Math.abs(date1 - date2) / 1000;
        let days = Math.floor(diffInSeconds / 60 / 60 / 24);
        let hours = Math.floor((diffInSeconds / 60 / 60) % 24);
        let minutes = Math.floor((diffInSeconds / 60) % 60);
        let seconds = Math.floor(diffInSeconds % 60);
        days = days.toString().length == 1 ? `0${days}` : days;
        hours = hours.toString().length == 1 ? `0${hours}` : hours;
        minutes = minutes.toString().length == 1 ? `0${minutes}` : minutes;
        seconds = seconds.toString().length == 1 ? `0${seconds}` : seconds;
        setTimer({
          start: true,
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        });
      } else {
        setTimer({
          start: false,
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      {timer.start === true ? (
        <div className="flex flex-col my-5 border rounded-md uppercase">
          <p className="text-gray-500 text-center font-semibold mt-2">Time left</p>
          <div className="flex items-center justify-around">
            <div className="w-[1px] h-10 border" />
            <div className="my-3 flex flex-col items-center">
              <span className="font-bold text-lg">{timer.days}</span>
              <span className="mb-1 text-[8px]">Days</span>
            </div>
            <div className="w-[1px] h-10 border" />
            <div className="my-3 flex flex-col items-center">
              <span className="font-bold text-lg">{timer.hours}</span>
              <span className="mb-1 text-[8px]">Hours</span>
            </div>
            <div className="w-[1px] h-10 border" />
            <div className="my-3 flex flex-col items-center">
              <span className="font-bold text-lg">{timer.minutes}</span>
              <span className="mb-1 text-[8px]">Minutes</span>
            </div>
            <div className="w-[1px] h-10 border" />
            <div className="my-3 flex flex-col items-center">
              <span className="font-bold text-lg">{timer.seconds}</span>
              <span className="mb-1 text-[8px]">Seconds</span>
            </div>
            <div className="w-[1px] h-10 border" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-3 text-red-500 font-semibold text-lg">
          <p>Auction Closed</p>
        </div>
      )}
    </>
  );
};

export default AuctionCardTimer;
