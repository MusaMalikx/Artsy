import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';
import { logout } from '../../../redux/features/reducer/userReducer';
import { getAuth, signOut } from 'firebase/auth';
import Toaster from '../../Common/Toaster';
import { useToaster } from 'rsuite';

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
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">2d ago</span>
            <span className="text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </span>
          </div>
          <div className="mt-6 w-fit mx-auto">
            <img
              src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
              className="rounded-full w-28 "
              alt="profile"
              srcSet=""
            />
          </div>

          <div className="mt-8 ">
            <h2 className="text-black font-bold text-2xl tracking-wide">
              Jonathan <br /> Smith
            </h2>
          </div>
          <p className="text-emerald-600 font-semibold mt-2.5">Active</p>

          <div className="h-1 w-full bg-gray-300 mt-8 rounded-full">
            <div className="h-1 rounded-full w-2/5 bg-red-500 "></div>
          </div>
          <div className="mt-3 text-white text-sm">
            <span className="text-gray-600 font-semibold">Storage:</span>
            <span>40%</span>
          </div>
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
