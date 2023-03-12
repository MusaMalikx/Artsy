import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';
import { logout } from '../../../redux/features/reducer/userReducer';
import { getAuth, signOut } from 'firebase/auth';
import Toaster from '../../Common/Toaster';
import { useToaster } from 'rsuite';
import ReactJdenticon from 'react-jdenticon';

const Profile = () => {
  const toaster = useToaster();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));

  const logoutuser = () => {
    const firebaseauth = getAuth();
    if (auth) {
      signOut(firebaseauth)
        .then(() => {
          // Sign-out successful for firebase
          localStorage.setItem('auth', JSON.stringify(null)); //remove auth token from localstorage
          setAuth(JSON.parse(localStorage.getItem('auth')));
          navigate('/admin/signin');
          dispatch(logout()); //Remove redux state for signedIn to false
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
          Toaster(toaster, 'error', 'An Error Occured When Logging Out, Refresh Page');
        });
    }
  };
  return (
    <div>
      <section className="font-medium sticky top-10">
        <section className="w-64 bg-[#FAF8F1] rounded-2xl px-8 py-6 shadow-lg">
          <div className="shadow-all w-fit mx-auto align-middle border-none bg-white">
            <ReactJdenticon size="150" value={auth?.user.email} />
          </div>

          <div className="mt-8 ">
            <h2 className="text-black font-bold text-2xl tracking-wide">{auth?.user?.name}</h2>
          </div>
          <p className="text-emerald-600 font-semibold mt-2.5">Active</p>
          <div className="flex justify-end mt-5 w-full" onClick={logoutuser}>
            <Button color="red" appearance="primary">
              Logout
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Profile;
