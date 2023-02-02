import React, { useEffect, useState } from 'react';
import API from '../../../api/server';
import Toaster from '../Toaster';
import { useToaster } from 'rsuite';

const AuctionItemTimer = ({ endDate, startDate, artwork }) => {
  const toaster = useToaster();
  const [timer, setTimer] = useState('00:00:00');
  const updateStatus = async () => {
    if (timer.localeCompare('Auction Closed') !== 0) {
      await API.put(`/api/artworks/status/${artwork}`, { status: 'closed' })
        .then((res) => {
          console.log('status Changed', res.status);
        })
        .catch((err) => {
          console.log(err);
          Toaster(toaster, 'error', err.response.data.message);
        });
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const date1 = new Date(endDate); //end date
      const date2 = new Date(); //current date
      const startdate = new Date(startDate); //start date
      if (date1 - date2 > 0 && startdate - date2 <= 0) {
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
      } else if (startdate - date2 > 0) {
        setTimer('Auction Comming Soon');
      } else {
        updateStatus();
        setTimer('Auction Closed');
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div
      className={`${
        timer.localeCompare('Auction Closed') === 0
          ? 'text-red-500'
          : timer.localeCompare('Comming Soon') === 0
          ? 'text-green-500'
          : ''
      }`}>
      {timer}
    </div>
  );
};

export default AuctionItemTimer;
