import { MdOutlineCreate, MdDescription } from 'react-icons/md';
import { FaMoneyBillWave, FaUserEdit } from 'react-icons/fa';
import API from '../../api/server';
import { useState, useEffect } from 'react';
import EmptyList from '../Animation/EmptyList';

const ArtistAcceptedBids = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [proposalList, setProposalList] = useState([]);
  const getProposals = async () => {
    await API.get('/api/artists/proposal/accepted', {
      headers: {
        token: 'Bearer ' + auth.token
      }
    })
      .then((res) => {
        setProposalList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <div className="sm:px-6 w-full">
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="mt-7 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <th className="focus:outline-none h-16 rounded flex w-full p-5 justify-between uppercase">
                {/* <td className="">Select</td> */}
                <td className="">Title</td>
                <td className="">Date Created</td>
                <td className="">Amount</td>
                <td className="">Description</td>
                <td className="">Buyer Name</td>
                <td className="">Chat</td>
              </th>
            </thead>
            <tbody>
              {proposalList.length > 0 ? (
                proposalList.map((p, i) => <ProposalTableItem key={i} proposal={p} />)
              ) : (
                <EmptyList />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProposalTableItem = ({ proposal }) => {
  return (
    <tr
      tabIndex="0"
      className={`focus:outline-none h-16 border my-2 border-gray-100 rounded flex w-full justify-between p-5 transition-all
   `}>
      {/* <td className="">
        <div className="bg-gray-200 rounded-sm w-5  h-5 flex flex-shrink-0 justify-center items-center relative">
          <input
            placeholder="checkbox"
            type="checkbox"
            className=" checked:bg-primary checked:border-primary "
          />
        </div>
      </td> */}
      <td className="">
        <p className="text-base capitalize font-medium text-gray-700">{proposal?.title}</p>
      </td>
      <td className="flex items-center">
        <MdOutlineCreate />
        <p className="text-sm leading-none text-gray-600 ml-2">{proposal?.dateCreated}</p>
      </td>
      <td className="flex items-center">
        {<FaMoneyBillWave />}
        <p className="text-sm leading-none text-gray-600 ml-2">{proposal?.acceptedAmount} Rs</p>
      </td>
      <td className="flex items-center">
        <MdDescription />
        <p className="text-sm leading-none text-gray-600 ml-2">{proposal?.description}</p>
      </td>
      <td className="flex items-center">
        {<FaUserEdit />}
        <p className="text-sm capitalize leading-none text-gray-600 ml-2">
          {proposal?.buyerId.name}
        </p>
      </td>
      <td className="flex items-center">
        <button
          className={`text-sm text-white leading-none  py-3 px-5 rounded primary focus:outline-none bg-primary active:bg-cyan-700 hover:bg-cyan-700
          `}>
          chat
        </button>
      </td>
    </tr>
  );
};

export default ArtistAcceptedBids;
