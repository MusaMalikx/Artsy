import React from 'react';
// import Graphs from '../../components/Dashboard/Admin/Graphs';
// import Info from '../../components/Dashboard/Admin/Info';
// import Navigation from '../../components/Dashboard/Admin/Navigation';
import Profile from '../../components/Dashboard/Admin/Profile';
import Stats from '../../components/Dashboard/Admin/Stats';
import AdminLayout from '../../components/Layouts/AdminLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout title="Auctions" bool>
      <HeaderLayout title="Dashboard" />
      <div className="py-10 flex flex-col gap-4 mx-10 relative">
        <div className="">
          <Stats />
          {/* <Info />
          <Graphs /> */}
        </div>
        <div className="flex mx-auto justify-center mt-10">
          <Profile />
        </div>
      </div>
      {/* <div className="fixed bottom-16 flex justify-center w-full">
        <Navigation />
      </div> */}
    </AdminLayout>
  );
};

export default AdminDashboard;
