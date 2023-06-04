import React from 'react';
// import Graphs from '../../components/Dashboard/Admin/Graphs';
// import Info from '../../components/Dashboard/Admin/Info';
// import Navigation from '../../components/Dashboard/Admin/Navigation';
import Profile from '../../components/Dashboard/Admin/Profile';
import Stats from '../../components/Dashboard/Admin/Stats';
import Info from '../../components/Dashboard/Admin/Info';
import Graphs from '../../components/Dashboard/Admin/Graphs';
import AdminLayout from '../../components/Layouts/AdminLayout';
import HeaderLayout from '../../components/Layouts/HeaderLayout';

/*
This component renders the admin dashboard interface, providing access to various administrative features and functionalities.
The layout and design are optimized for ease of use and efficient administration tasks.
*/
const AdminDashboard = () => {
  return (
    <AdminLayout title="Auctions" bool>
      <HeaderLayout title="Dashboard" />
      <div className="py-10 flex flex-col gap-4 mx-10 relative">
        <Stats />
        <div className="flex flex-col mx-auto items-center justify-center mt-10">
          <Profile />
          <Info />
        </div>
        <div className="max-w-5xl mx-auto">
          <Graphs />
        </div>
      </div>
      {/* <div className="fixed bottom-16 flex justify-center w-full">
        <Navigation />
      </div> */}
    </AdminLayout>
  );
};

export default AdminDashboard;
