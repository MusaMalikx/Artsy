import React, { useEffect, useState } from 'react';
// import Graphs from '../../components/Dashboard/Admin/Graphs';
// import Info from '../../components/Dashboard/Admin/Info';
// import Navigation from '../../components/Dashboard/Admin/Navigation';
import Profile from '../../components/Dashboard/Admin/Profile';
import Stats from '../../components/Dashboard/Admin/Stats';
import Info from '../../components/Dashboard/Admin/Info';
import Graphs from '../../components/Dashboard/Admin/Graphs';
import AdminLayout from '../../components/Layouts/AdminLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
import API from '../../api/server';
import { Loader } from 'rsuite';

/*
This component renders the admin dashboard interface, providing access to various administrative features and functionalities.
The layout and design are optimized for ease of use and efficient administration tasks.
*/
const AdminDashboard = () => {
  const [stat, setStat] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getCount = async () => {
      setLoader(true);
      await API.get('/api/users/count')
        .then((res) => {
          setStat(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoader(false));
    };

    getCount();
  }, []);

  // console.log(stat);

  return (
    <AdminLayout title="Auctions" bool>
      <HeaderLayout title="Dashboard" />
      {loader ? (
        <div className="flex justify-center mt-10">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="py-10 flex flex-col gap-4 mx-10 relative">
          <Stats stat={stat} />
          <div className="flex flex-col mx-auto items-center justify-center mt-10">
            <Profile />
            <Info stats={stat} />
            <Graphs stats={stat} />
          </div>
        </div>
      )}
      {/* <div className="fixed bottom-16 flex justify-center w-full">
        <Navigation />
      </div> */}
    </AdminLayout>
  );
};

export default AdminDashboard;
