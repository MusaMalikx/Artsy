import React from 'react';
import { useState } from 'react';
import { DatePicker, Dropdown, useToaster } from 'rsuite';
import ArtworkImageUploader from '../../components/Common/ArtworkImageUploader';
import Toaster from '../../components/Common/Toaster';
import Layout from '../../components/Layouts/ArticleLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import API from '../../api/server';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/userReducer';

export default function NewAuction() {
  const [category, setCategory] = useState('Modern');
  const toaster = useToaster();
  const [auth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [title, setTitle] = useState('');
  const [baseprice, setBaseprice] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [description, setDescription] = useState('');
  const user = useSelector(selectUser);
  const AddArtwork = async (e) => {
    e.preventDefault();
    console.log("Endate: ",enddate);
    console.log("Base price: ",baseprice);
    console.log("startdate: ",startdate);
    console.log("description: ",description);
    console.log("title: ",title);

    if(title == '' || baseprice == '' || startdate == '' || enddate == ''){
      Toaster(toaster, 'error', 'Missing Fields');
    }
    else if(user.artist && auth ) {
      await API.post('/api/artworks/check', {
        title: title,
        baseprice: baseprice,
        description: description
      }, 
      {
        headers: {
          token: 'Bearer ' + auth.token
        }
      }).then(async (res) => {
        console.log(res);
        await API.post('/api/artworks/add', {
          title: title,
          baseprice: baseprice,
          description: description,
          startdate: startdate,
          enddate: enddate,
          category: category
        }, 
        {
        headers: {
            token: 'Bearer ' + auth.token
          }
        }).then(res => {
          console.log(res);
          Toaster(toaster, 'success', 'Artwork Successfully Added');

        })
        .catch((err) => {
          console.log(err);
          Toaster(toaster, 'error', err.response.data.message);
        });
        //navigate('/');
      })
      .catch((err) => {
        console.log(err);
        Toaster(toaster, 'error', err.response.data.message);
      });
    }else {
      Toaster(toaster, 'error', 'Please Signin using Google');
    }
  }
  
  return (
    <Layout title={'Add Artwork'}>
      <HeaderLayout title="Add Artwork" />
      <div className="border-2   mb-14 w-10/12 mx-auto p-2 flex flex-col md:flex-row rounded-lg">
        <form className="flex flex-col w-full px-2 max-w-6xl" action="#">
          <div className="flex sm:flex-row flex-col gap-3">
            <div className="flex flex-col w-full">
              <label className=" text-lg font-bold my-2" htmlFor="title-artwork">
                Title
              </label>
              <input
                className="focus:outline-none border px-2 py-1 text-base rounded"
                type="text"
                name="title-artwork"
                placeholder="Ocean Coast"
                onChange = {(e) => {setTitle(e.target.value)}}
              />
              <label className=" text-lg font-bold my-2" htmlFor="start-date">
                Start Date
              </label>
              <DatePicker onChange = {(e) => {setStartdate(e.toDateString())}} />
            </div>
            <div className="flex flex-col w-full">
              <label className=" text-lg font-bold my-2" htmlFor="bid-artwork">
                Base Bid
              </label>
              <input
                className="focus:outline-none border px-2 py-1 text-base rounded"
                type="text"
                name="bid-artwork"
                placeholder="4000"
                onChange = {(e) => {setBaseprice(e.target.value)}}
              />
              <label className=" text-lg font-bold my-2" htmlFor="end-date">
                End Date
              </label>
              <DatePicker onChange = {(e) => {setEnddate(e.toDateString())}} />
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
            onChange = {(e) => {setDescription(e.target.value)}}
            rows={5}
            className="focus:outline-none border px-2 py-3 rounded-lg"
            placeholder="A distinct artwork depicting the last scenary before the sunset&#10;Material Used - Pastels&#10;Packing - Will be wrapped in bubble sheet "
            name="desc-artwork"></textarea>
          <button
            onClick={AddArtwork}
            className="focus:outline-none bg-black text-white mx-auto my-5 px-2 py-3 w-4/12 font-bold ">
            List Artwork
          </button>
        </form>
        <ArtworkImageUploader />
      </div>
      {/* {showToaster ? (
        <Toaster
          typeOf={'success'}
          showToaster={setShowToaster}
          Message={'Failed to List an Artwork'}
        />
      ) : (
        ''
      )} */}
    </Layout>
  );
}
