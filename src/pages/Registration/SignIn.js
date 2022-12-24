import React, { useState } from 'react';
import RegistrationLayout from '../../components/Layouts/RegistrationLayout';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { FaUserAlt, FaUserEdit, FaUserTie } from 'react-icons/fa';
import firebaseApp from '../../utils/firebase';
import API from '../../api/server';
//import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";    for redux part

export default function Login() {
  const [
    text
    //, helper
  ] = useTypewriter({
    words: ['Welcome to Artsy!', 'Good to see you again!', "Let's quickly Sign you In!"],
    loop: true,
    delaySpeed: 3000
  });

  const [user, setUser] = useState({
    buyer: true,
    artist: false,
    admin: false
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const signInWithGoogle = () => {
    //dispatch(loginStart());        for redux part
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
            email: result.user.email
          }).then((res) => {
            console.log(res);
            //dispatch(loginSuccess(res.data));    for redux part
            //navigate("/");
          });
        } else if (user.artist) {
          //await API.get('/').then((res) => console.log(res.data));
          await API.post('/api/auth/artist/google', {
            displayName: result.user.displayName,
            email: result.user.email
          }).then((res) => {
            console.log(res);
            //dispatch(loginSuccess(res.data));    for redux part
            //navigate("/");
          });
        } else if (user.admin) {
          // I think we should not allow admin to login through Google only email and password
        }

        // console.log(token, data);
      })
      .catch((error) => {
        //dispatch(loginFailure());          for redux part
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, credential);
      });
  };

  const signInWithEmailAndPass = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        // const data = userCredential.user;
        if (user.buyer) {
          await API.post('/api/auth/user/signin', {
            email: userCredential.user.email
          }).then((res) => {
            console.log(res);
            //dispatch(loginSuccess(res.data));    for redux part
            //navigate("/");
          });
        } else if (user.artist) {
          await API.post('/api/auth/artist/signin', {
            email: userCredential.user.email
          }).then((res) => {
            console.log(res);
            //dispatch(loginSuccess(res.data));    for redux part
            //navigate("/");
          });
        } else if (user.admin) {
          await API.post('/api/auth/admin/signin', {
            email: userCredential.user.email
          }).then((res) => {
            console.log(res);
            //dispatch(loginSuccess(res.data));    for redux part
            //navigate("/");
          });
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <RegistrationLayout title={'Login'}>
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
                    onClick={() => setUser({ buyer: true })}>
                    <FaUserAlt className="w-full" />
                    <p className="text-sm">Buyer</p>
                  </div>
                  <div
                    className={`border ${
                      user.artist && 'text-primary border-primary'
                    } hover:text-primary hover:border-primary w-16 h-16 flex flex-col  cursor-pointer text-center rounded-full pt-4`}
                    onClick={() => setUser({ artist: true })}>
                    <FaUserEdit className="w-full" />
                    <p className="text-sm">Artist</p>
                  </div>
                  <div
                    className={`border ${
                      user.admin && 'text-primary border-primary'
                    } hover:text-primary hover:border-primary w-16 h-16 flex flex-col  cursor-pointer text-center rounded-full pt-4`}
                    onClick={() => setUser({ admin: true })}>
                    <FaUserTie className="w-full" />
                    <p className="text-sm">Admin</p>
                  </div>
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
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
                  <a
                    href="#!"
                    className="text-primary hover:text-primary focus:text-primary active:text-primary duration-200 transition ease-in-out">
                    Forgot Password?
                  </a>
                </div>

                <button
                  onClick={signInWithEmailAndPass}
                  type="submit"
                  className="inline-block px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light">
                  Sign in
                </button>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <p
                  onClick={signInWithGoogle}
                  className="px-7 py-3 border border-slate-300 text-slate-400 font-medium text-sm leading-snug uppercase rounded-lg shadow-md focus:no-underline hover:text-slate-600 focus:text-slate-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out hover:no-underline w-full flex justify-center items-center mb-3"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 50"
                    className="h-4 w-4 mr-2">
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path
                      fill="#e53935"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path
                      fill="#4caf50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path
                      fill="#1565c0"
                      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
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
