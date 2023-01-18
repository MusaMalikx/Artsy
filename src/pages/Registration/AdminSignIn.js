import React, { useRef } from 'react';
import RegistrationLayout from '../../components/Layouts/RegistrationLayout';
import { FcGoogle } from 'react-icons/fc';
import Lottie from 'react-lottie-player';
import lottie from '../../assets/json/technology.json';
import { useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import { emailValidate, passValidate } from '../../helpers/credential-validators';

const AdminSignIn = () => {
  const [text] = useTypewriter({
    words: ['Welcome to Artsy!', 'Good to see you again!', "Let's quickly Sign you In!"],
    loop: true,
    delaySpeed: 3000
  });

  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const signInWithEmailAndPass = (e) => {
    console.log('hello');
    e.preventDefault();
    if (passValidate(password.current.value) && emailValidate(email.current.value)) {
      console.log('Success');
    } else {
      !emailValidate(email.current.value)
        ? email.current.setCustomValidity('Invalid Email Format!')
        : email.current.setCustomValidity('');
      !passValidate(password.current.value)
        ? password.current.setCustomValidity('Password Length must be greater than or equal to 6')
        : password.current.setCustomValidity('');
    }
  };

  return (
    <RegistrationLayout title="Admin">
      <div>
        <div className="py-6 min-h-screen flex">
          <div className="flex flex-grow bg-white rounded-lg shadow-all-rounded overflow-hidden my-auto mx-auto max-w-sm lg:max-w-4xl">
            <div className="hidden lg:block lg:w-1/2 bg-cover bg-black/80 backdrop-blur-md">
              <Lottie loop animationData={lottie} play />
            </div>
            <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-semibold text-primary text-center uppercase mb-2">
                Sign In
              </h2>
              <p className="text-xl text-gray-600 h-6 text-center">{text}</p>
              <a
                href="#"
                className="flex items-center justify-center mt-4 text-white rounded-lg shadow-all-rounded hover:bg-gray-100">
                <div className="px-4 py-3">
                  <FcGoogle size={20} />
                </div>
                <h1 className="px-4 py-3 w-5/6 text-base text-center text-gray-600 font-bold">
                  Sign in with Google
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
                  placeholder="Email address"
                  ref={email}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Password"
                  ref={password}
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-end">
                  <p className="text-xs text-gray-500 cursor-pointer hover:underline hover:underline-offset-2">
                    Forget Password?
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  onClick={signInWithEmailAndPass}
                  className="inline-block px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full">
                  Sign in
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <div className="text-center text-xs text-gray-500 uppercase">
                  <p onClick={() => navigate('/admin/signup')}>
                    Need an Account?{' '}
                    <span className="text-primary hover:text-primary focus:text-primary hover:underline hover:underline-offset-2 cursor-pointer">
                      Sign Up
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

export default AdminSignIn;
