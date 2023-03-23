import { MdOutlineCreate } from 'react-icons/md';
import { FaMoneyBillWave, FaUserEdit } from 'react-icons/fa';
import API from '../../api/server';
import { useState, useEffect } from 'react';
// import EmptyList from '../Animation/EmptyList';

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

  console.log(proposalList);

  return (
    <div className="sm:px-6 w-full">
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="mt-7 overflow-x-auto">
          <div className="w-full max-w-[80rem] overflow-x-scroll mx-auto whitespace-nowrap">
            <div>
              <div className="focus:outline-none font-bold grid grid-cols-5 mx-auto rounded w-full p-5 justify-between uppercase">
                <div className="">Title</div>
                <div className="">Date Created</div>
                <div className="">Amount</div>
                <div className="">Artist Name</div>
                <div className="">Chat</div>
              </div>
            </div>
            <div>
              {/* {proposalList.length > 0 ? (
            proposalList.map((p, i) => <ProposaldivItem key={i} />)
          ) : (
            <EmptyList />
          )} */}
              <ProposalTableItem />
              <ProposalTableItem />
              <ProposalTableItem />
              <ProposalTableItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProposalTableItem = ({ proposal }) => {
  console.log(proposal);
  return (
    <tr
      tabIndex="0"
      className={`focus:outline-none grid grid-cols-5 border my-2 border-gray-100 rounded w-full justify-between p-5 transition-all
   `}>
      <div className="">
        <p className="text-base capitalize font-medium text-gray-700">title</p>
      </div>
      <div className="flex items-center">
        <MdOutlineCreate />
        <p className="text-sm leading-none text-gray-600 ml-2">date</p>
      </div>
      <div className="flex items-center">
        {<FaMoneyBillWave />}
        <p className="text-sm leading-none text-gray-600 ml-2">Rs amount</p>
      </div>
      <div className="flex items-center">
        {<FaUserEdit />}
        <p className="text-sm capitalize leading-none text-gray-600 ml-2">name</p>
      </div>
      <div className="flex items-center">
        <button
          className={`text-sm text-white leading-none  py-3 px-5 rounded primary focus:outline-none bg-primary active:bg-cyan-700 hover:bg-cyan-700
          `}>
          chat
        </button>
      </div>
    </tr>
  );
};

export default ArtistAcceptedBids;
