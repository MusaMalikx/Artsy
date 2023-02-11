import React, { useEffect, useState } from 'react';
import Toaster from '../Toaster';
import API from '../../../api/server';
import { useToaster } from 'rsuite';
import { v4 as uuid } from 'uuid';
import { sendNotification } from '../../../helpers/notifications';

const AuctionCardTimer = ({ endDate, startDate, artwork, updateList }) => {
  const toaster = useToaster();
  const [isStop, setIsStop] = useState(false);
  const [timer, setTimer] = useState({
    start: 'true',
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const notifyUsers = async () => {
    const res = await API.get(`/api/artworks/bidderlist/${artwork._id}`);
    if (res) {
      let bidInfo = res.data;
      let totalBidders = bidInfo.losers.length;
      if (bidInfo.winner !== '') {
        await sendNotification(
          bidInfo.winner,
          uuid(),
          `Congratulations! You have won the artwork ${artwork.title}. Claim the won auction as soon as possible!`
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
          `The bidding time period for artwork ${artwork.title} is over! Total ${totalBidders} buyers placed their bid for the artwork auction!`
        );
      }
    }
  };

  const updateStatus = async () => {
    if (timer.start !== 'close') {
      await API.put(`/api/artworks/status/${artwork._id}`, { status: 'closed' })
        .then(async (res) => {
          if (updateList !== null) await updateList();
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
      const date2 = new Date(); //current time
      const startdate = new Date(startDate); //startdate
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
        setTimer({
          start: 'true',
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        });
      } else if (startdate - date2 > 0) {
        setTimer({
          start: 'next',
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
      } else {
        setTimer({
          start: 'close',
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
        updateStatus();
        notifyUsers();
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
  }, [isStop]);

  return (
    <>
      {timer.start === 'true' ? (
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
      ) : timer.start === 'next' ? (
        <div className="flex flex-col justify-center items-center my-3 text-green-500 font-semibold text-lg">
          <p>Auction Comming Soon</p>
        </div>
      ) : (
        <div className="flex flex-col py-5 justify-center items-center my-3 text-red-500 font-semibold text-lg">
          <p>Auction Closed</p>
        </div>
      )}
    </>
  );
};

export default AuctionCardTimer;
