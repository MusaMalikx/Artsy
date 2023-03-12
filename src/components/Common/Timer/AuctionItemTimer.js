import React, { useEffect, useState } from 'react';
import API from '../../../api/server';
import Toaster from '../Toaster';
import { Loader, useToaster } from 'rsuite';
import { v4 as uuid } from 'uuid';
import { sendNotification } from '../../../helpers/notifications';

const AuctionItemTimer = ({ endDate, startDate, artwork }) => {
  const toaster = useToaster();
  const [timer, setTimer] = useState('00:00:00');
  const [status, setStatus] = useState(artwork.status);
  const [isStop, setIsStop] = useState(false);
  const [loader, setLoader] = useState(true);
  const notifyUsers = async () => {
    const res = await API.get(`/api/artworks/bidderlist/${artwork.id}`);
    if (res && artwork.status.localeCompare('closed') !== 0) {
      let bidInfo = res.data;
      let totalBidders = bidInfo.losers.length;
      if (bidInfo.winner !== '') {
        await sendNotification(
          bidInfo.winner,
          uuid(),
          `Congratulations! You have won the artwork ${artwork.title}`
        );
        totalBidders += 1;
      }
      if (bidInfo.losers.length > 0) {
        bidInfo.losers.forEach(async (loserFid) => {
          await sendNotification(
            loserFid,
            uuid(),
            `The bidding time period for artwork ${artwork.title} is over! Unfortunately, you were not able to win. Thanks for participating.`
          );
        });
      }

      if (bidInfo.artistFid) {
        await sendNotification(
          bidInfo.artistFid,
          uuid(),
          `The bidding time period for artwork ${artwork.title} is over! Total ${totalBidders} buyers bidded for the auction!`
        );
      }
    }
  };

  const updateStatusClosed = async () => {
    if (timer.localeCompare('Auction Closed') !== 0 && status !== 'closed') {
      await API.put(`/api/artworks/status/${artwork.id}`, { status: 'closed' })
        .then((res) => {
          console.log('status Changed', res.status);
        })
        .catch((err) => {
          console.log(err);
          Toaster(toaster, 'error', err.response.data.message);
        });
    }
  };

  const updateStatusLive = async () => {
    if (status === 'comming soon') {
      await API.put(`/api/artworks/status/${artwork.id}`, { status: 'live' })
        .then((res) => {
          console.log('status Changed to live', res.status);
          setStatus('live');
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
        updateStatusLive();
        const diffInSeconds = Math.abs(date1 - date2) / 1000;
        let days = Math.floor(diffInSeconds / 60 / 60 / 24);
        let hours = Math.floor((diffInSeconds / 60 / 60) % 24);
        let minutes = Math.floor((diffInSeconds / 60) % 60);
        let seconds = Math.floor(diffInSeconds % 60);
        days = days.toString().length == 1 ? `0${days}` : days;
        hours = hours.toString().length == 1 ? `0${hours}` : hours;
        minutes = minutes.toString().length == 1 ? `0${minutes}` : minutes;
        seconds = seconds.toString().length == 1 ? `0${seconds}` : seconds;
        setLoader(false);
        setTimer(`${days}:${hours}:${minutes}:${seconds}`);
      } else if (startdate - date2 > 0) {
        setLoader(false);
        setTimer('Auction Comming Soon');
      } else {
        setLoader(false);
        notifyUsers();
        updateStatusClosed();
        setStatus('closed');
        setTimer('Auction Closed');
        setIsStop(true);
      }
    }, 1000);

    if (isStop) {
      clearInterval(interval);
      return;
    }

    return () => {
      clearInterval(interval);
    };
  }, [isStop, status]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default AuctionItemTimer;
