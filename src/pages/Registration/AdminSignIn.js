import React, { useRef } from 'react';
import RegistrationLayout from '../../components/Layouts/RegistrationLayout';
import { FcGoogle } from 'react-icons/fc';
import Lottie from 'react-lottie-player';
import lottie from '../../assets/json/technology.json';
import { useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import { emailValidate, passValidate } from '../../helpers/credential-validators';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword
} from 'firebase/auth';
import firebaseApp from '../../utils/firebase';
import API from '../../api/server';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/reducer/userReducer';

const AdminSignIn = () => {
  const [text] = useTypewriter({
    words: ['Welcome to Artsy!', 'Good to see you again!', "Let's quickly Sign you In!"],
    loop: true,
    delaySpeed: 3000
  });

  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const toaster = useToaster();
  const dispatch = useDispatch();

  const signInWithEmailAndPass = (e) => {
    if (passValidate(password.current.value) && emailValidate(email.current.value)) {
      e.preventDefault();
      console.log('Success');
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(async (userCredential) => {
          // Signed in
          await API.post('/api/auth/admin/signin', {
            email: userCredential.user.email
          }).then((res) => {
            console.log(res);
            const newData = { ...res.data, usertype: 'admin' };
            localStorage.setItem('auth', JSON.stringify(newData));
            dispatch(setUser({ admin: true }));
            navigate('/admin/dashboard');
          });
        })
        .catch((error) => {
          // setLoadSignIn(false);
          const errorMessage = error.message;
          console.log(errorMessage);
          if (
            errorMessage === 'Firebase: Error (auth/user-not-found).' ||
            errorMessage === 'Firebase: Error (auth/wrong-password).'
          ) {
            Toaster(toaster, 'error', 'Invalid Credentials Entered!');
          } else if (error.response) {
            if (error.response.data.message === 'User not found!') {
              Toaster(toaster, 'error', 'Incorrect Email or Password!');
            }
          } else {
            Toaster(toaster, 'error', errorMessage);
          }
        });
    } else {
      !emailValidate(email.current.value)
        ? email.current.setCustomValidity('Invalid Email Format!')
        : email.current.setCustomValidity('');
      !passValidate(password.current.value)
        ? password.current.setCustomValidity('Password Length must be greater than or equal to 6')
        : password.current.setCustomValidity('');
    }
  };
  const signInwithGoogle = async () => {
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        await API.post('/api/auth/admin/google/signin', {
          firebaseid: result.user.uid,
          email: result.user.email
        }).then((res) => {
          console.log(res);
          const newData = { ...res.data, usertype: 'admin' };
          localStorage.setItem('auth', JSON.stringify(newData));
          dispatch(setUser({ admin: true }));
          navigate('/admin/dashboard');
          // navigate('/');
        });

        // console.log(token, data);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, credential);
        if (error.response) {
          if (error.response.data.message === 'No Admin User Found!') {
            Toaster(toaster, 'error', 'No Admin User Found');
          }
        } else {
          Toaster(toaster, 'error', errorMessage);
        }
      });
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
              <p
                className="flex items-center justify-center mt-4 text-white rounded-lg shadow-all-rounded hover:bg-gray-100 cursor-pointer"
                onClick={signInwithGoogle}>
                <div className="px-4 py-3">
                  <FcGoogle size={20} />
                </div>
                <h1 className="px-4 py-3 w-5/6 text-base text-center text-gray-600 font-bold">
                  Sign in with Google
                </h1>
              </p>
              <form>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </RegistrationLayout>
  );
};

export default AdminSignIn;
