import React, { useRef, useState } from 'react';
import { Checkbox, Modal } from 'rsuite';
import { AiFillFlag } from 'react-icons/ai';
import { useToaster } from 'rsuite';
import Toaster from '../../Common/Toaster';
import { descriptionValidate, categoryValidate } from '../../../helpers/proposal-validators';
import API from '../../../api/server';
import { useLocation } from 'react-router-dom';

/*
This React component handles the reporting functionality.
It provides the necessary UI elements and logic to capture user reports.
The reports are then processed and dealt with according to the application's authenticity.
*/
export default function ProfileReport({ open, setOpen }) {
  const handleClose = () => {
    setCategoriesCheckbox([]);
    setOpen(false);
  };
  const location = useLocation();
  const currentUserID = location.pathname.split('/')[3];
  const description = useRef();
  const toaster = useToaster();
  const [categoriesCheckbox, setCategoriesCheckbox] = useState([]);
  const auth = JSON.parse(localStorage.getItem('auth'));

  //API call for submitting a user report
  const submitReport = async (e) => {
    let url = '';
    let body = {};
    if (auth.usertype === 'buyer') {
      url = '/api/users/report/artist';
      body = {
        category: categoriesCheckbox,
        description: description.current.value,
        artistid: currentUserID
      };
    } else {
      url = '/api/artists/report/buyer';
      body = {
        category: categoriesCheckbox,
        description: description.current.value,
        buyerid: currentUserID
      };
    }

    if (
      descriptionValidate(description.current.value) &&
      categoryValidate(categoriesCheckbox.length)
    ) {
      e.preventDefault();
      await API.post(url, body, {
        headers: {
          token: 'Bearer ' + auth.token
        }
      })
        .then((res) => {
          console.log(res.data);
          handleClose();
          Toaster(toaster, 'success', 'Successfully Reported');
        })
        .catch((err) => {
          Toaster(toaster, 'error', err.response.data.message);
        });
    } else if (!categoryValidate(categoriesCheckbox.length)) {
      e.preventDefault();
      description.current.setCustomValidity('');
      Toaster(toaster, 'error', 'Select a option!');
    } else {
      !descriptionValidate(description.current.value)
        ? description.current.setCustomValidity(
            'Description must have a minimum length of 10 characters'
          )
        : description.current.setCustomValidity('');
    }
  };

  const handleChange = (value, checked) => {
    // Case 1 : The user checks the box
    if (checked) {
      setCategoriesCheckbox((prev) => [...prev, value]);
    }
    // Case 2  : The user unchecks the box
    else {
      setCategoriesCheckbox((prev) => prev.filter((item) => item !== value));
    }
  };
  return (
    <Modal onClose={handleClose} size="sm" open={open}>
      <Modal.Header>
        <Modal.Title>
          <p className="text-lg font-bold flex justify-center items-center gap-2 text-red-500">
            {' '}
            <AiFillFlag />
            Report
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-lg font-bold mb-3">What went wrong?</p>
        <form action="#">
          <div className="flex flex-col w-full">
            <div className="flex ">
              <Checkbox
                className="w-1/2"
                value="Fake Profile"
                onChange={(value, checked) => handleChange(value, checked)}>
                {' '}
                Fake Profile
              </Checkbox>
              <Checkbox
                className="w-1/2"
                value="Scam"
                onChange={(value, checked) => handleChange(value, checked)}>
                {' '}
                Scam
              </Checkbox>
              <Checkbox
                className="w-1/2"
                value="Inappropriate Behaviour"
                onChange={(value, checked) => handleChange(value, checked)}>
                {' '}
                Inappropriate Behaviour
              </Checkbox>
            </div>
            <div className="flex ">
              <Checkbox
                className="w-1/2"
                value="Hateful Content"
                onChange={(value, checked) => handleChange(value, checked)}>
                {' '}
                Hateful Content
              </Checkbox>
              <Checkbox
                className="w-1/2"
                value="Misleading"
                onChange={(value, checked) => handleChange(value, checked)}>
                {' '}
                Misleading
              </Checkbox>
              <Checkbox
                className="w-1/2"
                value="Spam Messages"
                onChange={(value, checked) => handleChange(value, checked)}>
                {' '}
                Spam Messages
              </Checkbox>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <label className="text-base font-bold" htmlFor="report-desc">
              Description
            </label>
            <textarea
              ref={description}
              name="report-desc"
              className="h-40 rounded-lg resize-none bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"></textarea>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={submitReport}
              className="bg-primary active:bg-cyan-800 py-1 px-3 rounded focus:outline-none text-white font-bold text-base">
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
