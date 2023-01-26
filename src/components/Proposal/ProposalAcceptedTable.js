import React, { useEffect, useState } from 'react';
import { MdOutlineCreate } from 'react-icons/md';
import { FaUserEdit, FaMoneyBillWave } from 'react-icons/fa';
import { useToaster } from 'rsuite';
import Toaster from '../Common/Toaster';
import API from '../../api/server';
import EmptyList from '../Animation/EmptyList';

const ProposalAcceptedTable = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [proposalList, setProposalList] = useState([]);
  const [deletePropsalList, setDeletePropsalList] = useState([]);
  const toaster = useToaster();
  const getProposals = async () => {
    const res = await API.get('/api/users/proposal/accepted', {
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
          '/api/users/proposal/accepted/delete',
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
          Toaster(toaster, 'success', 'Successfully deleted!');
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
    <div className="sm:px-6 w-full">
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
                <td className="w-14">Title</td>
                <td className="ml-12 w-40">Date Created</td>
                <td className=" w-44">Amount</td>
                <td className="mr-24 w-40">Artist Name</td>
                <td className="">Action</td>
              </th>
            </thead>
            <tbody>
              {proposalList.length > 0 ? (
                proposalList.map((p) => (
                  <ProposalTableItem
                    proposalId={p.proposalId}
                    updateList={getProposals}
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

const ProposalTableItem = ({ proposal, alterDeleteList, proposalId, updateList }) => {
  const toaster = useToaster();
  const releasePayment = async (e) => {
    e.preventDefault();
    if (proposal.paid === false) {
      const auth = JSON.parse(localStorage.getItem('auth'));
      try {
        const res = await API.get(`/api/users/payment/release/${proposalId}`, {
          headers: {
            token: 'Bearer ' + auth.token
          }
        });
        if (res.status === 200) {
          updateList();
          Toaster(toaster, 'success', 'Payment sent succesfully!');
        }
      } catch (error) {
        Toaster(toaster, 'error', 'Transaction Failed!');
      }
    }
  };
  return (
    <tr
      tabIndex="0"
      className={`focus:outline-none h-16 border my-2 border-gray-100 rounded flex w-full justify-between p-5 hover:scale-95 transition-all ${
        proposal.paid ? 'bg-green-100' : ''
      }`}>
      <td className="">
        <div className="bg-gray-200 rounded-sm w-5  h-5 flex flex-shrink-0 justify-center items-center relative">
          <input
            onChange={(e) => {
              if (proposal.paid === true) alterDeleteList(proposal._id);
              else {
                e.target.checked = false;
              }
            }}
            placeholder="checkbox"
            type="checkbox"
            className=" checked:bg-primary checked:border-primary "
          />
        </div>
      </td>
      <td className="">
        <p className="text-base capitalize font-medium text-gray-700">{proposal.title}</p>
      </td>
      <td className="flex items-center w-40">
        <MdOutlineCreate />
        <p className="text-sm leading-none text-gray-600 ml-2">{proposal.dateCreated}</p>
      </td>
      <td className="flex items-center w-40">
        {<FaMoneyBillWave />}
        <p className="text-sm leading-none text-gray-600 ml-2">Rs {proposal.acceptedAmount}</p>
      </td>
      <td className="flex items-center w-40">
        {<FaUserEdit />}
        <p className="text-sm capitalize leading-none text-gray-600 ml-2">
          {proposal.artistInfo.artistName}
        </p>
      </td>
      <td className="flex items-center w-40">
        <button
          onClick={releasePayment}
          className={`text-sm text-white leading-none  py-3 px-5 rounded primary focus:outline-none ${
            proposal.paid === false
              ? 'bg-primary active:bg-cyan-700 hover:bg-cyan-700'
              : 'bg-green-500 cursor-default'
          } `}>
          {proposal.paid ? 'Payment Released' : 'Release Payment'}
        </button>
      </td>
    </tr>
  );
};

export default ProposalAcceptedTable;
