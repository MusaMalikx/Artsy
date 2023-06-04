import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import Layout from '../../components/Layouts/RegistrationLayout';
import { getAuth } from 'firebase/auth';
import { Loader } from 'rsuite';
import { emailValidate } from '../../helpers/credential-validators';
import { useLocation, useNavigate } from 'react-router-dom';

/*
This component handles the functionality to reset a user's password.
It provides the necessary form and logic to facilitate the password reset process.
*/
const ForgotPassword = () => {
  const [load, setLoader] = useState(false);
  const email = useRef();
  const navigate = useNavigate();
  const query = useLocation().pathname.split('/').indexOf('admin');

  const resetPassword = async () => {
    console.log(email.current.value);

    if (emailValidate(email.current.value)) {
      setLoader(true);
      try {
        //Calling an API for sending password recovery email
        await sendPasswordResetEmail(getAuth(), email.current.value);
        console.log('reset email sent successfully');
        alert('Check Your Email Inbox');
        setLoader(false);
        if (query == 1) {
          navigate('/admin/signin');
        } else {
          navigate('/signin');
        }
      } catch (error) {
        console.log('Error sending verification email', error);
        setLoader(false);
      }
    } else {
      !emailValidate(email.current.value)
        ? email.current.setCustomValidity('Invalid Email Format!')
        : email.current.setCustomValidity('');
    }
  };

  return (
    <Layout title="Verify">
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <div className="max-w-xl min-h-[400px] px-5 flex flex-col justify-center items-center text-center bg-gray-100">
          <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Artsy Team</h2>
          <p className="mb-2 text-lg text-zinc-500">
            We get it, stuff happens. Just enter your email address below and we&apos;ll send you a
            link to reset your password!
          </p>
          <div className="my-6">
            <input
              type="email"
              className="border-[1px] border-gray-300 w-96 flex-grow-1 flex text-gray-900 text-sm focus:border-primary focus:ring-primary p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              placeholder="Enter Email"
              ref={email}
            />
          </div>
          <div
            onClick={resetPassword}
            className="mt-3 w-96 rounded cursor-pointer flex items-center justify-center bg-primary px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            {load && <Loader size="sm" className="mr-3" />}
            <p>Send Reset Password Link</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
