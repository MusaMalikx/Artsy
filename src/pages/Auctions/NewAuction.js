import React, { useRef } from 'react';
import { useState } from 'react';
import { DatePicker, Dropdown, useToaster } from 'rsuite';
// import ArtworkImageUploader from '../../components/Common/ArtworkImageUploader';
import Toaster from '../../components/Common/Toaster';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import API from '../../api/server';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/reducer/userReducer';
import {
  titleValidate,
  amountValidate,
  descriptionValidate,
  dateValidate
} from '../../helpers/proposal-validators.js';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import ArtworkImageUploader from '../../components/Common/ArtworkImageUploader';

export default function NewAuction() {
  const [category, setCategory] = useState('Modern');
  const toaster = useToaster();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const title = useRef();
  const baseprice = useRef();
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const description = useRef();
  const [images, setImages] = useState({});
  const [startLoader, setStartLoader] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const AddArtwork = async (e) => {
    // const startDate = new Date(startdate);
    // const endDate = new Date(enddate);
    // const currentDate = new Date();

    // const startdatestring = startdate.toLocaleString();
    // const startdateDate = new Date(startdatestring);

    // console.log('startDate:- ', startDate);
    // console.log('startdate:-', startdate);
    // console.log('current date:- ', currentDate);
    // console.log('start date:- ', startDate);
    // console.log('difference:- ', startDate - currentDate);

    if (
      //Also Add check if files are selected or not , and max limit for pictures are 3 for now, change limit in backend in artworks.js in /add api
      titleValidate(title.current.value) &&
      descriptionValidate(description.current.value) &&
      amountValidate(baseprice.current.value) &&
      startdate != '' &&
      enddate != ''
    ) {
      e.preventDefault();
      if (dateValidate(startdate, enddate, toaster)) {
        setStartLoader(true);
        if (user.artist && auth) {
          await API.post(
            '/api/artworks/check',
            {
              title: title.current.value,
              baseprice: baseprice.current.value,
              description: description.current.value
            },
            {
              headers: {
                token: 'Bearer ' + auth.token
              }
            }
          )
            .then(async (res) => {
              const formData = new FormData();
              // formData.append('productImage', images);
              for (let i = 0; i < images.length && i < 9; i++) {
                formData.append('productImage', images[i]);
              }
              formData.append('title', title.current.value);
              formData.append('baseprice', baseprice.current.value);
              formData.append('description', description.current.value);
              formData.append('startdate', startdate.toLocaleString());
              formData.append('enddate', enddate.toLocaleString());
              formData.append('category', category);

              const config = {
                headers: {
                  token: 'Bearer ' + auth.token,
                  'Content-Type': 'multipart/form-data'
                }
              };

              console.log(res);
              await API.post('/api/artworks/add', formData, config)
                .then((res) => {
                  setTimeout(() => {
                    setStartLoader(false);
                  }, 2000);
                  console.log(res);
                  Toaster(toaster, 'success', 'Artwork Successfully Added');
                })
                .catch((err) => {
                  setStartLoader(false);
                  console.log(err);
                  Toaster(toaster, 'error', err.response.data.message);
                });
              navigate(`/artist/profile/${auth.user._id}`);
            })
            .catch((err) => {
              setStartLoader(false);
              console.log(err);
              Toaster(toaster, 'error', err.response.data.message);
            });
        } else {
          setStartLoader(false);
          Toaster(toaster, 'error', 'Please Signin using Google');
        }
      }
    } else {
      setStartLoader(false);
      !titleValidate(title.current.value)
        ? title.current.setCustomValidity(
            'Title must contain only alphabets and length should be greater than or equal to 4'
          )
        : title.current.setCustomValidity('');
      !amountValidate(baseprice.current.value)
        ? baseprice.current.setCustomValidity('Invalid base price!')
        : baseprice.current.setCustomValidity('');
      !descriptionValidate(description.current.value)
        ? description.current.setCustomValidity(
            'Invalid Description. Atleast 10 characters are expected!'
          )
        : description.current.setCustomValidity('');
      if (startdate == '' || enddate == '') {
        e.preventDefault();
        Toaster(toaster, 'error', 'Missing Dates');
      }
    }
  };

  return (
    <Layout title={'Add Artwork'}>
      <HeaderLayout title="Add Artwork" />
      <div className="border-2   mb-14 w-10/12 mx-auto p-2 flex flex-col lg:flex-row rounded-lg">
        <form className="flex flex-col w-full px-2 lg:max-w-4xl" action="#">
          <div className="flex sm:flex-row flex-col gap-3">
            <div className="flex flex-col w-full">
              <label className=" text-lg font-bold my-2" htmlFor="title-artwork">
                Title
              </label>
              <input
                className="focus:outline-none border px-2 py-1 text-base rounded focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                type="text"
                name="title-artwork"
                placeholder="Ocean Coast"
                ref={title}
              />
              <label className=" text-lg font-bold my-2" htmlFor="start-date">
                Start Date
              </label>
              <DatePicker format="yyyy-MM-dd HH:mm" onChange={(date) => setStartDate(date)} />
            </div>
            <div className="flex flex-col w-full">
              <label className=" text-lg font-bold my-2" htmlFor="bid-artwork">
                Base Bid
              </label>
              <input
                className="focus:outline-none border px-2 py-1 text-base rounded focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                type="text"
                name="bid-artwork"
                placeholder="4000"
                ref={baseprice}
              />
              <label className=" text-lg font-bold my-2" htmlFor="end-date">
                End Date
              </label>
              <DatePicker format="yyyy-MM-dd HH:mm" onChange={(date) => setEndDate(date)} />
            </div>
          </div>
          <label className="text-lg font-bold my-2" htmlFor="bid-artwork">
            Category
          </label>
          <Dropdown className="w-full mb-2" size="sm" title={category}>
            <Dropdown.Item
              onClick={(e) => {
                setCategory(e.target.innerText);
              }}>
              Modern
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                setCategory(e.target.innerText);
              }}>
              Religious
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                setCategory(e.target.innerText);
              }}>
              Calligraphy
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                setCategory(e.target.innerText);
              }}>
              Cubism
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                setCategory(e.target.innerText);
              }}>
              Fantasy
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                setCategory(e.target.innerText);
              }}>
              Graffiti
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                setCategory(e.target.innerText);
              }}>
              Sculpture
            </Dropdown.Item>
          </Dropdown>

          <label className=" text-lg font-bold my-2" htmlFor="desc-artwork">
            Description
          </label>
          <textarea
            ref={description}
            rows={5}
            className="focus:outline-none border px-2 py-3 rounded-lg focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            placeholder="A distinct artwork depicting the last scenary before the sunset&#10;Material Used - Pastels&#10;Packing - Will be wrapped in bubble sheet "
            name="desc-artwork"></textarea>
          {/* <input
            type="file"
            onChange={(e) => {
              setImages(e.target.files);
            }}
            multiple
          /> */}
          {startLoader ? (
            <Loader />
          ) : (
            <button
              onClick={AddArtwork}
              className="focus:outline-none bg-black text-white mx-auto my-5 px-2 py-3 w-4/12 font-bold ">
              List Artwork
            </button>
          )}
        </form>
        <ArtworkImageUploader
          setImageList={(files) => {
            setImages(files);
          }}
        />
      </div>
    </Layout>
  );
}
