import React, { useRef } from 'react';
import { Button, Modal } from 'rsuite';
import cardPng from '../../assets/images/card.png';

import {
  holderNameValidate,
  cardNumberValidate,
  amountValidate,
  secruityCodeValidate
} from '../../helpers/wallet-validators';

const AddMoney = ({ open, handleClose }) => {
  const holderName = useRef();
  const cardNumber = useRef();
  const cardAmount = useRef();
  const expiryMonth = useRef();
  const expiryYear = useRef();
  const securityCode = useRef();
  const addAmount = (e) => {
    if (
      holderNameValidate(holderName.current.value) &&
      cardNumberValidate(cardNumber.current.value) &&
      amountValidate(cardAmount.current.value) &&
      secruityCodeValidate(securityCode.current.value) &&
      expiryMonth.current.value != '' &&
      expiryYear.current.value != ''
    ) {
      e.preventDefault();
      handleClose();

      ///Write Axios API code Here
    } else {
      !holderNameValidate(holderName.current.value)
        ? holderName.current.setCustomValidity(
            'Name must contain only alphabets and length should be greater than or equal to 3'
          )
        : holderName.current.setCustomValidity('');
      !cardNumberValidate(cardNumber.current.value)
        ? cardNumber.current.setCustomValidity('Invalid card number')
        : cardNumber.current.setCustomValidity('');
      !amountValidate(cardAmount.current.value)
        ? cardAmount.current.setCustomValidity('Invalid card amount')
        : cardAmount.current.setCustomValidity('');
      !secruityCodeValidate(securityCode.current.value)
        ? securityCode.current.setCustomValidity('Invalid security code')
        : securityCode.current.setCustomValidity('');
      expiryYear.current.value == ''
        ? expiryYear.current.setCustomValidity('Select a year')
        : expiryYear.current.setCustomValidity('');
      expiryMonth.current.value == ''
        ? expiryMonth.current.setCustomValidity('Select a month')
        : expiryMonth.current.setCustomValidity('');
    }
  };

  return (
    <Modal open={open} onClose={handleClose} size="xs">
      <form onClick={addAmount}>
        <img src={cardPng} alt="card" />
        <main className="px-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Adding Money from Card
          </h1>
          <div className="">
            <div className="my-3">
              <input
                ref={holderName}
                type="text"
                className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                placeholder="Card holder"
                maxLength="22"
                // x-model="cardholder"
              />
            </div>
            <div className="my-3">
              <input
                ref={cardNumber}
                type="number"
                min={0}
                className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                placeholder="Card number"
                // x-model="cardNumber"
                // x-on:keydown="format()"
                // x-on:keyup="isValid()"
                maxLength="19"
                onChange={(e) => {
                  if (e.target.value.length > 16) e.target.value = e.target.value.slice(0, 16);
                }}
              />
            </div>
            <div className="my-3">
              <input
                ref={cardAmount}
                type="number"
                min={1}
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
                  ref={expiryMonth}
                  name=""
                  id=""
                  className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
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
                  ref={expiryYear}
                  name=""
                  id=""
                  className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  // x-model="expired.year"
                >
                  <option value="" selected disabled>
                    YY
                  </option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2026">2027</option>
                  <option value="2026">2028</option>
                </select>
                <input
                  type="number"
                  min={0}
                  className="block w-full col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Security code"
                  ref={securityCode}
                  onChange={(e) => {
                    if (e.target.value.length > 3) e.target.value = e.target.value.slice(0, 3);
                  }}
                  // x-model="securityCode"
                />
              </div>
            </div>
          </div>
        </main>
        <footer className="mt-6 p-4">
          <Button
            type="submit"
            appearance="ghost"
            block
            style={{ color: '#188796', borderColor: '#188796' }}>
            Add money
          </Button>
        </footer>
      </form>
    </Modal>
  );
};

export default AddMoney;
