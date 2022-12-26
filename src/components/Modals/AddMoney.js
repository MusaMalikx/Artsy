import React from 'react';
import { Button, Modal } from 'rsuite';
import cardPng from '../../assets/images/card.png';

const AddMoney = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} size="xs">
      <img src={cardPng} alt="card" />
      <main className="px-4">
        <h1 className="text-xl font-semibold text-gray-700 text-center">Adding Money from Card</h1>
        <div className="">
          <div className="my-3">
            <input
              type="text"
              className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              placeholder="Card holder"
              maxLength="22"
              // x-model="cardholder"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              placeholder="Card number"
              // x-model="cardNumber"
              // x-on:keydown="format()"
              // x-on:keyup="isValid()"
              maxLength="19"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              placeholder="amount"
            />
          </div>
          <div className="mt-3 flex flex-col">
            <div className="mb-2">
              <label htmlFor="" className="text-gray-700">
                Expired
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <select
                name=""
                id=""
                className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                // x-model="expired.month"
              >
                <option value="" selected disabled>
                  MM
                </option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select
                name=""
                id=""
                className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                // x-model="expired.year"
              >
                <option value="" selected disabled>
                  YY
                </option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
              <input
                type="text"
                className="block w-full col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Security code"
                maxLength="3"
                // x-model="securityCode"
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-6 p-4">
        <Button
          onClick={handleClose}
          appearance="ghost"
          block
          style={{ color: '#188796', borderColor: '#188796' }}>
          Add money
        </Button>
      </footer>
    </Modal>
  );
};

export default AddMoney;
