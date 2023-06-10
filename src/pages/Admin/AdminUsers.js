import AdminLayout from '../../components/Layouts/AdminLayout';
import { FaGoogle } from 'react-icons/fa';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import { BsViewList } from 'react-icons/bs';
import ReactJdenticon from 'react-jdenticon';
import { AiOutlineMail } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import API from '../../api/server';
import { useNavigate } from 'react-router-dom';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import SearchBar from '../../components/Common/SearchBar';
import { MdOutlineWarning } from 'react-icons/md';

/*
This React component renders a list of users for admin to monitor. 
The component provides a clear and concise way to display the users' information.
*/
const AdminUsers = () => {
  const [users, setUsers] = useState();
  const [tempUsers, setTempUsers] = useState();
  const [artists, setArtists] = useState();
  const [tempArtists, setTempArtists] = useState();
  const [auth] = useState(JSON.parse(localStorage.getItem('auth')));
  // const [search, setSearch] = useState("")

  //API call for getting list of users
  const getUsers = async () => {
    try {
      const res = await API.get('/api/users');
      // console.log(res.data);
      setUsers(res.data);
      setTempUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //API call for getting list of artists
  const getArtists = async () => {
    try {
      const res = await API.get('/api/artists');
      setArtists(res.data);
      setTempArtists(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    console.log(e);
    const search = e.target.value;
    if (search === '') {
      setUsers(tempUsers);
      setArtists(tempArtists);
    } else {
      setUsers(tempUsers.filter((user) => user.name.toLowerCase().includes(search.toLowerCase())));
      setArtists(
        tempArtists.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
      );
      // console.log(tempUsers.filter((user) => user.name.toLowerCase().includes(e.lowerCase())));
    }
  };

  useEffect(() => {
    getUsers();
    getArtists();
  }, []);

  // console.log(tempUsers);
  // console.log('users', users);

  return (
    <AdminLayout title="Users" bool>
      <HeaderLayout title="Users" />
      <div className="sm:px-6 w-full">
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="overflow-x-auto">
            <div className="sticky top-0">
              <SearchBar handleSearch={handleSearch} placeholder="Search the user by name" />
            </div>
            <div className="w-[80rem] overflow-x-scroll mx-auto whitespace-nowrap h-[65vh]">
              <div className="sticky top-0 z-20">
                <div className="focus:outline-none grid bg-white shadow-all grid-cols-10 h-16 rounded w-full p-5 justify-between uppercase font-bold">
                  <div className="">Id</div>
                  <div className="col-span-2">Name</div>
                  <div className="col-span-3">Email</div>
                  <div className="">Google</div>
                  <div className="">Warnings</div>
                  <div className="">UnBan User</div>
                  <div className="">Action</div>
                </div>
              </div>
              <div>
                {users?.map(
                  (user) =>
                    user._id !== auth?.user?._id && (
                      <ProposaldivItem
                        key={user._id}
                        user={user}
                        auth={auth}
                        status={user.isAdmin ? 'Admin' : 'Buyer'}
                        getUsers={getUsers}
                        getArtists={getArtists}
                      />
                    )
                )}
                {artists?.map((user) => (
                  <ProposaldivItem
                    key={user._id}
                    user={user}
                    auth={auth}
                    status="Artist"
                    getUsers={getUsers}
                    getArtists={getArtists}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

/*
This React component renders a single user entry in user table
*/
const ProposaldivItem = ({ user, status, getUsers, getArtists, auth }) => {
  const navigate = useNavigate();
  const toaster = useToaster();
  const [delLoading, setDelLoading] = useState(false);
  // console.log(auth.token);

  const viewUser = () => {
    if (status === 'Buyer') navigate(`/admin/buyer/profile/${user._id}`);
    else if (status === 'Artist') navigate(`/admin/artist/profile/${user._id}`);
  };

  //API call to delete a user
  const deleteUser = async () => {
    console.log(delLoading);
    setDelLoading(true);
    await API.delete(
      `/api/${status === 'Artist' ? 'artists' : status === 'Buyer' && 'users'}/${user._id}`
    )
      .then(async (res) => {
        console.log(res.data);
        Toaster(toaster, 'success', 'User Deleted');
        setDelLoading(false);
        if (status === 'Artist') getArtists();
        if (status === 'Buyer') getUsers();
      })
      .catch((err) => {
        console.log(err);
        Toaster(toaster, 'error', err.response.data.message);
        setDelLoading(false);
      });
  };

  const unbanUser = async () => {
    try {
      await API.put(
        `/api/${status.toLowerCase() === 'artist' ? 'artists' : 'users'}/unban/${user._id}`,
        null,
        {
          headers: {
            token: 'Bearer ' + auth.token
          }
        }
      );
      Toaster(toaster, 'success', 'User is unbanned');
      getUsers();
      getArtists();
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      tabIndex="0"
      className={`focus:outline-none items-center border my-2 border-gray-100 rounded w-full justify-between p-5 transition-all grid grid-cols-10
   `}>
      <div className="">
        <div className="bg-gray-100 w-fit text-xs font-bold px-2 py-1 rounded-sm flex flex-shrink-0 justify-center items-center relative">
          {status}
        </div>
      </div>
      <div className="flex items-center space-x-2 col-span-2">
        <div className="flex overflow-hidden shadow-all">
          <ReactJdenticon size="40" value={user?.email} />
        </div>
        <p className="text-base capitalize font-medium text-gray-700">{user?.name}</p>
      </div>
      <div className="flex items-center col-span-3">
        {<AiOutlineMail />}
        <p className="text-sm leading-none text-gray-600 ml-2">{user?.email}</p>
      </div>
      <div className="flex items-center">
        <FaGoogle />
        <p className="text-sm capitalize leading-none text-gray-600 ml-2">
          {user?.fromGoogle ? 'true' : 'false'}
        </p>
      </div>
      <div className="flex items-center">
        <MdOutlineWarning />
        <p className="text-sm capitalize leading-none text-gray-600 ml-2">{user?.warnings}</p>
      </div>
      <div className="flex items-center">
        <p className="text-sm capitalize leading-none text-gray-600 ml-2">
          {user?.warnings < 3
            ? 'not banned'
            : user?.warnings === 3 && (
                <button
                  onClick={unbanUser}
                  className="text-white leading-none  py-2 px-3 rounded primary focus:outline-none bg-primary active:bg-cyan-700 hover:bg-cyan-700">
                  unban
                </button>
              )}
        </p>
      </div>
      <div className="flex space-x-2 items-center">
        <button
          onClick={viewUser}
          className="text-lg text-white leading-none  py-1 px-2 rounded primary focus:outline-none bg-primary active:bg-cyan-700 hover:bg-cyan-700">
          <BsViewList />
        </button>
        <div className="invisible hidden" onClick={deleteUser} />
      </div>
    </div>
  );
};

export default AdminUsers;
