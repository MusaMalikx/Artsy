import React, { useEffect, useState } from 'react';
const AuctionItemTimer = ({ endDate }) => {
  const [timer, setTimer] = useState('00:00:00');
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
        setTimer(`${days}:${hours}:${minutes}:${seconds}`);
      } else {
        setTimer('Auction Closed');
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return <div>{timer}</div>;
};

export default AuctionItemTimer;
