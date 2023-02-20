import React, { useEffect, useState } from 'react';
import { Dropdown, IconButton, SelectPicker } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { FaPaintBrush } from 'react-icons/fa';
import { MdOutlineCreate, MdPayment } from 'react-icons/md';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsChatLeftDots, BsThreeDotsVertical } from 'react-icons/bs';
import API from '../../api/server';

const AuctionTable = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [artworks, setArtworks] = useState([]);
  const [status, setStatus] = useState('All');
  const getAllArtworks = async (status) => {
    await API.get(`/api/artworks/artistlist?status=${status}`, {
      headers: {
        token: 'Bearer ' + auth.token
      }
    })
      .then((res) => {
        setArtworks(res.data);
        console.log(res.data);
        // const singleartwork = res.data[0];
        // console.log(singleartwork);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllArtworks(status);
  }, [status]);

  return (
    <div className="sm:px-6 w-full">
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <SortTable updateStatus={setStatus} />
        <div className="mt-7 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <th className="focus:outline-none h-16 rounded flex w-full p-5 justify-between uppercase text-left ">
                <td className="w-32">Title</td>
                <td className="ml-12 w-48">Date Created</td>
                <td className=" w-48">Total Bids</td>
                <td className="mr-24 w-32">Status</td>
                <td className="">Payment</td>
                <td className="">Action</td>
              </th>
            </thead>
            <tbody>
              {artworks.map((artwork) => (
                <AuctionTableItem key={artwork._id} data={artwork} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AuctionTableItem = (data) => {
  const endDate = data.data.enddate.split(',')[0];
  return (
    <>
      <tr
        tabIndex="0"
        className="focus:outline-none h-16 border my-2 border-gray-100 rounded flex w-full justify-between p-5 transition-all">
        <td className="flex items-center">
          <FaPaintBrush />
          <p className="text-base ml-2  capitalize font-medium text-gray-700">{data.data.title}</p>
        </td>
        <td className="flex items-center w-40">
          <MdOutlineCreate />
          <p className="text-sm leading-none text-gray-600 ml-2">{endDate}</p>
        </td>
        <td className="flex items-center w-40">
          {<BsChatLeftDots />}
          <p className="text-sm leading-none text-gray-600 ml-2">{data.data.totalBids}</p>
        </td>
        <td className="flex items-center w-40">
          {<AiOutlineExclamationCircle />}
          <p className="text-sm capitalize leading-none text-gray-600 ml-2">{data.data.status}</p>
        </td>
        <td className="flex items-center">
          {<MdPayment />}
          <p className="text-sm capitalize leading-none text-gray-600 ml-2">
            {data.data.paymentStatus === null
              ? 'NA'
              : data.data.paymentStatus === true
              ? 'Paid'
              : 'Pending'}
          </p>
        </td>
        <td className="">
          {/* <div className="bg-gray-200 rounded-sm w-5  h-5 flex flex-shrink-0 justify-center items-center relative">
            <input
              placeholder="checkbox"
              type="checkbox"
              className=" checked:bg-primary checked:border-primary "
            />
          </div> */}
          <Drop artworkId={data.data._id} />
        </td>
      </tr>
    </>
  );
};

const SortTable = ({ updateStatus }) => {
  const data = ['All', 'Live', 'Closed'].map((item) => ({ label: item, value: item }));
  return (
    <div className="flex flex-grow justify-end">
      <SelectPicker
        cleanable={false}
        defaultValue="All"
        onChange={(value) => {
          //Make API calls based on values
          updateStatus(value);
          console.log(value);
        }}
        searchable={false}
        data={data}
        style={{ width: 224 }}
      />
    </div>
  );
};

const renderIconButton = (props, ref) => {
  return <IconButton {...props} ref={ref} icon={<BsThreeDotsVertical />} circle />;
};

const Drop = ({ artworkId }) => {
  const navigate = useNavigate();
  const handleViewArtworkClick = async () => {
    // call your API here
    const res = await API.get(`/api/artworks/artwork/${artworkId}`);
    if (res.data) {
      const artwork = res.data[0];
      navigate(`/auctions/${artworkId}`, { state: { artwork } });
    }
  };
  return (
    <>
      <Dropdown placement="bottomEnd" renderToggle={renderIconButton}>
        <Dropdown.Item onClick={handleViewArtworkClick}>View Artwork</Dropdown.Item>
        <Dropdown.Item>Edit Artwork</Dropdown.Item>
        <Dropdown.Item>Delete Artwork</Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default AuctionTable;
