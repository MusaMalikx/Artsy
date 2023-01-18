import React from 'react';
import RegistrationLayout from '../../components/Layouts/RegistrationLayout';
import { FcGoogle } from 'react-icons/fc';

const AdminSignIn = () => {
  return (
    <RegistrationLayout title={'Admin'}>
      <div>
        <div className="py-6 min-h-screen flex">
          <div className="flex flex-grow bg-white rounded-lg shadow-lg overflow-hidden my-auto mx-auto max-w-sm lg:max-w-4xl">
            <div
              className="hidden lg:block lg:w-1/2 bg-cover"
              style={{
                'background-image':
                  "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"
              }}></div>
            <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">Artsy</h2>
              <p className="text-xl text-gray-600 text-center">Welcome back!</p>
              <a
                href="#"
                className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                <div className="px-4 py-3">
                  <FcGoogle size={20} />
                </div>
                <h1 className="px-4 py-3 w-5/6 text-base text-center text-gray-600 font-bold">
                  Sign in with Google
                </h1>
              </a>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <a href="#" className="text-xs text-center text-gray-500 uppercase">
                  or login with email
                </a>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>
              {/* <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                />
              </div> */}
              <div className="my-6">
                <input
                  type="text"
                  className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Email address"
                  //   ref={email}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Password"
                  //   ref={password}
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-end">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2">Password</label> */}
                  <a href="#" className="text-xs text-gray-500">
                    Forget Password?
                  </a>
                </div>
                {/* <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                /> */}
              </div>
              <div className="mt-8">
                <button
                  // onClick={signedIn}
                  //   onClick={signInWithEmailAndPass}
                  type="submit"
                  className="inline-block px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light">
                  Sign in
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <a href="#" className="text-xs text-gray-500 uppercase">
                  or sign up
                </a>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RegistrationLayout>
  );
};

export default AdminSignIn;
