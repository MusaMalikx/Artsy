import React, { useRef, useState } from 'react';
import RegistrationLayout from '../../components/Layouts/RegistrationLayout';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import { emailValidate, passValidate } from '../../helpers/credential-validators';
import { FcGoogle } from 'react-icons/fc';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { FaUserAlt, FaUserEdit } from 'react-icons/fa';
import firebaseApp from '../../utils/firebase';
import API from '../../api/server';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../redux/features/reducer/userReducer';
import Toaster from '../../components/Common/Toaster';
import { Toggle, useToaster } from 'rsuite';
import { ClipLoader } from 'react-spinners';
//import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";    for redux part

export default function SignIn() {
  const [
    text
    //, helper
  ] = useTypewriter({
    words: ['Welcome to Artsy!', 'Good to see you again!', "Let's quickly Sign you In!"],
    loop: true,
    delaySpeed: 3000
  });

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const toaster = useToaster();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [loadSignIn, setLoadSignIn] = useState(false);
  const [test, setTest] = useState(false);
  // console.log(test);

  const signInWithGoogle = () => {
    //dispatch(loginStart());        for redux part
    setLoadSignIn(true);
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        // const data = result.user;

        if (user.buyer) {
          await API.post('/api/auth/user/google', {
            displayName: result.user.displayName,
            firebaseid: result.user.uid,
            email: result.user.email,
            imageURL: result.user.photoURL
          }).then((res) => {
            console.log(res);
            const newData = { ...res.data, usertype: 'buyer' };
            localStorage.setItem('auth', JSON.stringify(newData));
            navigate('/');
            //dispatch(loginSuccess(res.data));    for redux part
            //navigate("/");
          });
        } else if (user.artist) {
          //await API.get('/').then((res) => console.log(res.data));
          await API.post('/api/auth/artist/google', {
            displayName: result.user.displayName,
            firebaseid: result.user.uid,
            email: result.user.email,
            imageURL: result.user.photoURL
          }).then((res) => {
            console.log(res);
            const newData = { ...res.data, usertype: 'artist' };
            localStorage.setItem('auth', JSON.stringify(newData));
            navigate('/');
            //dispatch(loginSuccess(res.data));    for redux part
            // navigate("/");
          });
        } else {
          Toaster(toaster, 'error', 'Select a user type');
          setLoadSignIn(false);
        }

        // console.log(token, data);
      })
      .catch((error) => {
        setLoadSignIn(false);
        //dispatch(loginFailure());          for redux part
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, credential);
        if (error.response) {
          if (
            error.response.data.message === 'Email already exists For a Buyer!' ||
            error.response.data.message === 'Email already exists For an Artist!'
          ) {
            Toaster(toaster, 'error', 'Gmail account not found for user');
          }
        } else {
          Toaster(toaster, 'error', errorMessage);
        }
      });
  };

  const signInWithEmailAndPass = async (e) => {
    if (passValidate(password?.current.value) && emailValidate(email?.current.value)) {
      setLoadSignIn(true);
      e.preventDefault();
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(async (userCredential) => {
          // Signed in
          // const data = userCredential.user;
          if (user.buyer) {
            await API.post('/api/auth/user/signin', {
              email: userCredential.user.email
            }).then((res) => {
              console.log(res);
              const newData = { ...res.data, usertype: 'buyer' };
              localStorage.setItem('auth', JSON.stringify(newData));
              navigate('/');
              //dispatch(loginSuccess(res.data));    for redux part
              //navigate("/");
            });
          } else if (user.artist) {
            await API.post('/api/auth/artist/signin', {
              email: userCredential.user.email
            }).then((res) => {
              console.log(res);
              const newData = { ...res.data, usertype: 'artist' };
              localStorage.setItem('auth', JSON.stringify(newData));
              navigate('/');
              //dispatch(loginSuccess(res.data));    for redux part
              //navigate("/");
            });
          } else {
            Toaster(toaster, 'error', 'Select a user type');
            setLoadSignIn(false);
          }
          // ...
        })
        .catch((error) => {
          setLoadSignIn(false);
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
      setLoadSignIn(false);
      !emailValidate(email.current.value)
        ? email.current.setCustomValidity('Invalid Email Format!')
        : email.current.setCustomValidity('');
      !passValidate(password.current.value)
        ? password.current.setCustomValidity('Password Length must be greater than or equal to 6')
        : password.current.setCustomValidity('');
    }

    if (test) {
      navigate('/');
    }
  };

  const signInTest = async (e) => {
    e.preventDefault();
    if (user.buyer || user.artist) {
      if (test) {
        if (user.buyer)
          try {
            const res = await API.post('/api/auth/user/signin-test', {
              email: email?.current.value,
              password: password?.current.value
            });
            // .then((res) => {
            //   console.log(res);
            //   const newData = { ...res.data, usertype: 'buyer' };
            //   localStorage.setItem('auth', JSON.stringify(newData));
            //   navigate('/');
            //   // e.preventDefault();
            // });
            console.log(res);
            const newData = { ...res.data, usertype: 'buyer' };

            localStorage.setItem('auth', JSON.stringify(newData));
            navigate('/');
          } catch (error) {
            console.log(error);
          }
        else if (user.artist) {
          try {
            const res = await API.post('/api/auth/artist/signin-test', {
              email: email?.current.value,
              password: password?.current.value
            });
            // .then((res) => {
            //   console.log(res);
            //   const newData = { ...res.data, usertype: 'buyer' };
            //   localStorage.setItem('auth', JSON.stringify(newData));
            //   navigate('/');
            //   // e.preventDefault();
            // });
            console.log(res);
            const newData = { ...res.data, usertype: 'artist' };

            localStorage.setItem('auth', JSON.stringify(newData));
            navigate('/');
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else {
      Toaster(toaster, 'error', 'Select a user type');
    }
  };

  // const signedIn = () => {
  //   if (user.buyer) {
  //     // setSignedIn(true);
  //     navigate('/');
  //   } else if (user.artist) {
  //     // setSignedIn(true);
  //     navigate('/');
  //   } else if (user.admin) {
  //     navigate('/admin/dashboard');
  //     // setSignedIn(true);
  //   }
  // };

  return (
    <RegistrationLayout title={'Sign in'}>
      <section className="h-screen">
        <div className="">
          <div className="flex w-full h-16 justify-center px-6">
            <img
              className="pt-2"
              src="https://www.designfreelogoonline.com/wp-content/uploads/2019/02/00645-Paint-04.png"
              alt=""
            />
            <p className="pt-2  text-5xl text-primary font-bold tracking-widest ">Artsy</p>
          </div>
          <div className="mt-10">
            <p className="lg:text-5xl uppercase tracking-widest text-3xl text-center text-primary font-bold px-6">
              {text} <Cursor />{' '}
            </p>
          </div>
        </div>
        <div className="px-6 pb-12 ">
          <div className="flex justify-center lg:pt-24 flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-7/12 lg:w-5/12 mb-12 md:mb-0 h-96 items-center overflow-hidden relative">
              <p className="text-5xl  md:text-7xl font-extrabold whitespace-nowrap border-white text-white border-b-4 pb-2 absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                SIGN IN
              </p>

              <img
                src="https://www.canvashi.com/images/ContemporaryArt/Contemporary%20Art%20%20XB10A.jpg"
                className="w-full h-full object-fill"
                alt="phone"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form>
                <div className="mb-6 flex w-full justify-center gap-4">
                  <div
                    className={`border ${
                      user.buyer && 'text-primary border-primary'
                    } hover:text-primary hover:border-primary w-16 h-16 flex flex-col  cursor-pointer text-center rounded-full pt-4`}
                    onClick={() => dispatch(setUser({ buyer: true }))}>
                    <FaUserAlt className="w-full" />
                    <p className="text-sm">Buyer</p>
                  </div>
                  <div
                    className={`border ${
                      user.artist && 'text-primary border-primary'
                    } hover:text-primary hover:border-primary w-16 h-16 flex flex-col  cursor-pointer text-center rounded-full pt-4`}
                    onClick={() => dispatch(setUser({ artist: true }))}>
                    <FaUserEdit className="w-full" />
                    <p className="text-sm">Artist</p>
                  </div>
                  {/* <div
                    className={`border ${
                      user.admin && 'text-primary border-primary'
                    } hover:text-primary hover:border-primary w-16 h-16 flex flex-col  cursor-pointer text-center rounded-full pt-4`}
                    onClick={() => dispatch(setUser({ admin: true }))}>
                    <FaUserTie className="w-full" />
                    <p className="text-sm">Admin</p>
                  </div> */}
                </div>
                <div className="mb-10">
                  <Toggle
                    checkedChildren="Test Login"
                    unCheckedChildren="Real Login"
                    onChange={(c) => setTest(c)}
                    checked={test}
                  />
                </div>
                <div className="mb-6">
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

                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck3"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck2">
                      Remember me
                    </label>
                  </div>
                  <p
                    onClick={() => navigate('/signin/reset-password')}
                    className="text-primary cursor-pointer hover:underline hover:underline-offset-2 hover:text-primary focus:text-primary active:text-primary duration-200 transition ease-in-out">
                    Forgot Password?
                  </p>
                </div>
                <button
                  // onClick={signedIn}
                  onClick={(e) => (test ? signInTest(e) : signInWithEmailAndPass(e))}
                  className="flex justify-center text-center items-center px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full">
                  {loadSignIn && <ClipLoader size={20} color="#fff" className="mr-4" />}
                  Sign in
                </button>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <p
                  onClick={signInWithGoogle}
                  className="px-7 py-3 border text-center border-slate-300 text-slate-400 font-medium text-sm leading-snug uppercase rounded-lg shadow-md focus:no-underline hover:text-slate-600 focus:text-slate-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out hover:no-underline w-full flex justify-center items-center mb-3">
                  {loadSignIn ? (
                    <ClipLoader size={20} color="#188796" className="mr-2" />
                  ) : (
                    <FcGoogle className="h-4 w-4 mr-2" />
                  )}
                  Continue with Google
                </p>

                <div className="mt-6 text-center">
                  <p onClick={() => navigate('/signup')}>
                    Need an Account?{' '}
                    <span className="text-primary hover:text-primary focus:text-primary hover:underline hover:underline-offset-2 cursor-pointer">
                      Sign Up
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </RegistrationLayout>
  );
}
