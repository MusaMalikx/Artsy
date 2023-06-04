import { sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import Layout from '../../components/Layouts/ArticleLayout';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Loader } from 'rsuite';

/*
This React component handles email verification for user registered on website.
It includes the necessary logic and UI components for verifying the email address.
*/
const Verification = () => {
  const [user] = useAuthState(getAuth());
  const [load, setLoader] = useState(false);

  const actionCodeSettings = {
    url: 'http://localhost:3000',
    handleCodeInApp: true
  };

  //API call for verifying an email address of a user
  const sendVerificationEmail = async () => {
    setLoader(true);
    try {
      await sendEmailVerification(user, actionCodeSettings);
      console.log('Verification email sent successfully');
      alert('Check Your Email Inbox');
      setLoader(false);
    } catch (error) {
      console.log('Error sending verification email', error);
      setLoader(false);
    }
  };

  return (
    <Layout title="Verify">
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <div className="max-w-xl min-h-[400px] px-5 flex flex-col justify-center items-center text-center bg-gray-100">
          {user.emailVerified ? (
            <>
              <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Artsy Team</h2>
              <p className="mb-2 text-lg text-zinc-500">
                We are glad, that you&apos;re with us ? But{' '}
                <span className="font-medium text-indigo-500">{user.email}</span> is already
                verified.
              </p>
              <p className="mt-3 inline-block w-96 rounded cursor-pointer bg-primary px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20">
                Already Verified
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Artsy Team</h2>
              <p className="mb-2 text-lg text-zinc-500">
                We are glad, that you&apos;re with us ? Click the below button to send you a
                verification link to the email address{' '}
                <span className="font-medium text-indigo-500">{user.email}</span>.
              </p>
              <div
                onClick={sendVerificationEmail}
                className="mt-3 w-96 rounded cursor-pointer flex items-center justify-center bg-primary px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                {load && <Loader size="sm" className="mr-3" />}
                <p>Send Verification Email</p>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Verification;
