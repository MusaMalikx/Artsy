import React, { useEffect, useState } from 'react';
import { BsChatLeftDots } from 'react-icons/bs';
import { MdOutlineCreate } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useToaster } from 'rsuite';
import API from '../../api/server';
import EmptyList from '../Animation/EmptyList';
import Toaster from '../Common/Toaster';

const ProposalTable = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [proposalList, setProposalList] = useState([]);
  const [deletePropsalList, setDeletePropsalList] = useState([]);
  const toaster = useToaster();
  const getProposals = async () => {
    const res = await API.get('/api/users/proposal', {
      headers: {
        token: 'Bearer ' + auth.token
      }
    });
    if (res.data) {
      setProposalList(res.data);
    }
  };
  const deleteProposals = async () => {
    try {
      if (deletePropsalList.length > 0) {
        const res = await API.post(
          '/api/users/proposal/delete',
          {
            proposalList: deletePropsalList
          },
          {
            headers: {
              token: 'Bearer ' + auth.token
            }
          }
        );
        if (res.data) {
          setDeletePropsalList([]);
          getProposals();
          Toaster(toaster, 'success', 'Successfully deleted proposals!');
        }
      }
    } catch (error) {
      Toaster(toaster, 'error', 'Failed to delete proposals!');
    }
  };
  const selectRowForDelete = (proposalId) => {
    if (deletePropsalList.indexOf(proposalId) === -1) {
      setDeletePropsalList((list) => [...list, proposalId]);
    } else {
      setDeletePropsalList((list) => list.filter((id) => id !== proposalId));
    }
  };

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <div className="sm:px-6 w-full min-h-screen">
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="w-full text-right">
          <button
            onClick={deleteProposals}
            className="bg-red-500 text-white font-bold px-4 py-2 rounded uppercase active:bg-red-700 focus:outline-none ">
            Delete
          </button>
        </div>
        <div className="mt-7 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <th className="focus:outline-none h-16 rounded flex w-full p-5 justify-between uppercase text-left ">
                <td className="">Select</td>
                <td className="w-36">Title</td>
                <td className="w-36">Date Created</td>
                <td className="w-48">Total Bids</td>
                <td className="">Action</td>
              </th>
            </thead>
            <tbody>
              {proposalList.length > 0 ? (
                proposalList.map((p) => (
                  <ProposalTableItem
                    alterDeleteList={selectRowForDelete}
                    proposal={p}
                    key={p._id}
                  />
                ))
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

const ProposalTableItem = ({ proposal, alterDeleteList }) => {
  const navigate = useNavigate();
  return (
    <tr
      tabIndex="0"
      className="focus:outline-none h-16 border my-2 border-gray-100 rounded flex w-full justify-between p-5 hover:scale-95 transition-all ">
      <td className="">
        <div className="bg-gray-200 rounded-sm w-5  h-5 flex flex-shrink-0 justify-center items-center relative">
          <input
            onChange={() => {
              alterDeleteList(proposal._id);
            }}
            placeholder="checkbox"
            type="checkbox"
            className=" checked:bg-primary checked:border-primary "
          />
        </div>
      </td>
      <td className="w-36">
        <p className="text-base font-medium text-gray-700">{proposal.title}</p>
      </td>
      <td className="flex items-center w-36">
        <MdOutlineCreate />
        <p className="text-sm leading-none text-gray-600 ml-2">{proposal.dateCreated}</p>
      </td>
      <td className="flex items-center w-36">
        {<BsChatLeftDots />}
        <p className="text-sm leading-none text-gray-600 ml-2">
          {proposal.artistProposals.length} Bids
        </p>
      </td>
      <td className="flex items-center">
        <button
          onClick={() => navigate(`/view/artist/proposal/${proposal._id}`)}
          className="text-sm text-white leading-none  py-3 px-5 bg-primary rounded active:bg-cyan-700 primary focus:outline-none">
          View
        </button>
      </td>
    </tr>
  );
};

export default ProposalTable;
