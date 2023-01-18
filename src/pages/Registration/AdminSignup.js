import React from 'react';
import RegistrationLayout from '../../components/Layouts/RegistrationLayout';
import { FcGoogle } from 'react-icons/fc';
import Lottie from 'react-lottie-player';
import lottie from '../../assets/json/web-design-animation.json';
import { useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';

const AdminSignUp = () => {
  const [text] = useTypewriter({
    words: ['Welcome to Artsy!', 'Good to see you again!', "Let's create a new account!"],
    loop: true,
    delaySpeed: 3000
  });

  const navigate = useNavigate();

  return (
    <RegistrationLayout title="Admin">
      <div>
        <div className="py-6 min-h-screen flex">
          <div className="flex flex-grow bg-white rounded-lg shadow-all-rounded overflow-hidden my-auto mx-auto max-w-sm lg:max-w-4xl">
            <div className="hidden lg:w-1/2 bg-cover bg-black/30 backdrop-blur-md lg:flex justify-center items-center">
              <Lottie loop animationData={lottie} play />
            </div>
            <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-semibold text-primary text-center uppercase mb-2">
                Sign Up
              </h2>
              <p className="text-xl text-gray-600 h-6 text-center">{text}</p>
              <a
                href="#"
                className="flex items-center justify-center mt-4 text-white rounded-lg shadow-all-rounded hover:bg-gray-100">
                <div className="px-4 py-3">
                  <FcGoogle size={20} />
                </div>
                <h1 className="px-4 py-3 w-5/6 text-base text-center text-gray-600 font-bold">
                  Sign up with Google
                </h1>
              </a>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/3"></span>
                <p className="text-xs text-center text-gray-500 uppercase">or</p>
                <span className="border-b w-1/3"></span>
              </div>
              <div className="my-6">
                <input
                  type="text"
                  className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Full Name"
                  // ref={name}
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Email address"
                  // ref={email}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Password"
                  // ref={password}
                />
              </div>
              <div className="mb-6">
                <input
                  type="number"
                  min={0}
                  className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Phone Number"
                  // ref={phonenumber}
                  onChange={(e) => {
                    if (e.target.value.length > 11) e.target.value = e.target.value.slice(0, 11);
                  }}
                />
              </div>
              <div className="mb-6">
                <input
                  type="number"
                  min={0}
                  className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="CNIC"
                  onChange={(e) => {
                    if (e.target.value.length > 13) e.target.value = e.target.value.slice(0, 13);
                  }}
                  // ref={cnicfield}
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck3"
                    // onClick={() => setAcceptTerms(!acceptTerms)}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="exampleCheck2">
                    I agree to{' '}
                    <span className="text-primary cursor-pointer hover:text-cyan-900 hover:underline">
                      Terms and Agreements
                    </span>{' '}
                  </label>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light">
                  Sign up
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <div className="text-center text-xs text-gray-500 uppercase">
                  <p onClick={() => navigate('/admin/signin')}>
                    Have an Account?{' '}
                    <span className="text-primary hover:text-primary focus:text-primary hover:underline hover:underline-offset-2 cursor-pointer">
                      Sign In
                    </span>
                  </p>
                </div>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RegistrationLayout>
  );
};

export default AdminSignUp;
