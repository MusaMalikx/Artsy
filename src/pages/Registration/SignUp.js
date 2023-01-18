import React, { useRef, useState } from 'react';
import RegistrationLayout from '../../components/Layouts/RegistrationLayout';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaUserEdit } from 'react-icons/fa';
import firebaseApp from '../../utils/firebase';
import API from '../../api/server';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../redux/features/reducer/userReducer';
import {
  emailValidate,
  passValidate,
  nameValidate,
  phoneValidate,
  cnicValidate
} from '../../helpers/credential-validators';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import Loader from '../../components/Loader/Loader';
import {
  useSignUpArtistWithEmailMutation,
  useSignUpArtistWithGoogleMutation,
  useSignUpBuyerWithEmailMutation,
  useSignUpBuyerWithGoogleMutation
} from '../../redux/features/api/signupReducer';

export default function SignUp() {
  const [
    text
    //, helper
  ] = useTypewriter({
    words: ['Welcome to Artsy!', 'Good to see you again!', "Let's create a new account!"],
    loop: true,
    delaySpeed: 3000
  });
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const toaster = useToaster();
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [signUpBuyerWithGoogle, signUpBuyerWithGoogleResponse] = useSignUpBuyerWithGoogleMutation();

  const [signUpArtistWithGoogle, signUpArtistWithGoogleResponse] =
    useSignUpArtistWithGoogleMutation();

  const [signUpBuyerWithEmail, signUpBuyerWithEmailResponse] = useSignUpBuyerWithEmailMutation();

  const [signUpArtistWithEmail, signUpArtistWithEmailResponse] = useSignUpArtistWithEmailMutation();

  console.log(
    signUpBuyerWithGoogleResponse,
    signUpArtistWithGoogleResponse,
    signUpBuyerWithEmailResponse,
    signUpArtistWithEmailResponse
  );

  // const [user, setUser] = useState({
  //   buyer: true,
  //   artist: false
  // });

  const email = useRef();
  const password = useRef();
  const name = useRef();
  const phonenumber = useRef();
  const cnicfield = useRef();
  const [loadSignUp, setLoadSignUp] = useState(false);
  // const clearInputs = () => {
  //   setEmail('');
  //   setPassword('');
  //   setName('');
  //   setPhonenumber('');
  //   setCnicfield('');
  // };

  const signUpwithEmail = async (e) => {
    if (
      emailValidate(email.current.value) &&
      passValidate(password.current.value) &&
      nameValidate(name.current.value) &&
      phoneValidate(phonenumber.current.value) &&
      cnicValidate(cnicfield.current.value)
    ) {
      e.preventDefault();
      if (!user.buyer && !user.artist) {
        setLoadSignUp(false);
        Toaster(toaster, 'error', 'Select User Type');
      } else if (!acceptTerms) {
        setLoadSignUp(false);
        Toaster(toaster, 'error', 'Accept Terms and Agreements to Continue');
      } else {
        // setLoadSignUp(true);
        let url = '/api/auth/user/check';
        if (user.buyer) {
          url = '/api/auth/user/check';
        } else if (user.artist) {
          url = '/api/auth/artist/check';
        }
        await API.post(url, {
          phonenumber: phonenumber.current.value,
          cnic: cnicfield.current.value
        })
          .then((res) => {
            console.log(res);
            if (
              name.current.value != '' &&
              email.current.value != '' &&
              password.current.value != ''
            ) {
              const auth = getAuth();
              createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then(async (userCredential) => {
                  // Signed in
                  // const data = userCredential.user;
                  const payload = {
                    email: userCredential.user.email,
                    firebaseid: userCredential.user.uid,
                    name: name.current.value,
                    phonenumber: phonenumber.current.value,
                    cnic: cnicfield.current.value
                  };

                  if (user.buyer) {
                    signUpBuyerWithEmail(payload);
                  } else if (user.artist) {
                    signUpArtistWithEmail(payload);
                  } else {
                    setLoadSignUp(false);
                    Toaster(toaster, 'error', 'Select a user type');
                  }
                  // ...
                })
                .catch((error) => {
                  setLoadSignUp(false);
                  // const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage);
                  if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                    Toaster(toaster, 'error', 'Email already exists!');
                  } else if (error.response) {
                    if (error.response.data.message === 'EMAIL_EXISTS') {
                      Toaster(toaster, 'error', 'Incorrect Email or Password!');
                    }
                  } else if (
                    errorMessage ===
                    'Firebase: Password should be at least 6 characters (auth/weak-password).'
                  ) {
                    Toaster(toaster, 'error', 'Password should be at least 6 characters');
                  } else {
                    Toaster(toaster, 'error', errorMessage);
                  }
                });
            } else {
              setLoadSignUp(false);
              Toaster(toaster, 'error', 'Input fields missing!');
            }
          })
          .catch((error) => {
            setLoadSignUp(false);
            console.log(error.status, error.message);
            if (error.response) {
              if (error.response.data.message === 'PhoneNumber Already exists!') {
                Toaster(toaster, 'error', 'PhoneNumber already exists!');
              } else if (error.response.data.message === 'cnic Already exists!') {
                Toaster(toaster, 'error', 'Cnic already exists!');
              } else {
                Toaster(toaster, 'error', error.message);
              }
            } else {
              Toaster(toaster, 'error', error.message);
            }
          });
      }
    } else {
      setLoadSignUp(false);
      !nameValidate(name.current.value)
        ? name.current.setCustomValidity(
            'Name must contain only alphabets and length should be greater than or equal to 3'
          )
        : name.current.setCustomValidity('');
      !emailValidate(email.current.value)
        ? email.current.setCustomValidity('Invalid Email Format!')
        : email.current.setCustomValidity('');
      !passValidate(password.current.value)
        ? password.current.setCustomValidity('Password Length must be greater than or equal to 6')
        : password.current.setCustomValidity('');
      !phoneValidate(phonenumber.current.value)
        ? phonenumber.current.setCustomValidity('Invalid Phone Number')
        : phonenumber.current.setCustomValidity('');
      !cnicValidate(cnicfield.current.value)
        ? cnicfield.current.setCustomValidity('Invalid CNIC')
        : cnicfield.current.setCustomValidity('');
    }
  };

  const signInWithGoogle = () => {
    // setLoadSignUp(true);
    //dispatch(loginStart());        for redux part

    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // // The signed-in user info.
        // const data = result.user;
        if (user.buyer) {
          const payload = {
            displayName: result.user.displayName,
            firebaseid: result.user.uid,
            email: result.user.email,
            imageURL: result.user.photoURL
          };
          signUpBuyerWithGoogle(payload);
          // await API.post('/api/auth/user/google', {
          //   displayName: result.user.displayName,
          //   firebaseid: result.user.uid,
          //   email: result.user.email,
          //   imageURL: result.user.photoURL
          // }).then((res) => {
          //   console.log(res);
          //   localStorage.setItem('auth', JSON.stringify({ ...res.data, type: 'buyer' }));
          //   navigate('/');
          //   //dispatch(loginSuccess(res.data));    for redux part
          //   //navigate("/");
          // });
        } else if (user.artist) {
          const payload = {
            displayName: result.user.displayName,
            firebaseid: result.user.uid,
            email: result.user.email,
            imageURL: result.user.photoURL
          };
          signUpArtistWithGoogle(payload);
          //await API.get('/').then((res) => console.log(res.data));
          // await API.post('/api/auth/artist/google', {
          //   displayName: result.user.displayName,
          //   firebaseid: result.user.uid,
          //   email: result.user.email,
          //   imageURL: result.user.photoURL
          // }).then((res) => {
          //   console.log(res);
          //   localStorage.setItem('auth', JSON.stringify({ ...res.data, type: 'artist' }));
          //   navigate('/');
          //   //dispatch(loginSuccess(res.data));    for redux part
          //   //navigate("/");
          // });
        } else {
          setLoadSignUp(false);
          Toaster(toaster, 'error', 'Select a user type');
        }
        // console.log(token, data);
      })
      .catch((error) => {
        setLoadSignUp(false);
        //dispatch(loginFailure());          for redux part
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, credential);
        if (error.response) {
          if (
            error.response.data.message === 'Email already exists For a Buyer!' ||
            error.response.data.message === 'Email already exists For an Artist!'
          ) {
            Toaster(toaster, 'error', 'Gmail account already exists for a user');
          }
        } else {
          Toaster(toaster, 'error', errorMessage);
        }
      });
  };

  return (
    <RegistrationLayout title={'Login'}>
      <section className="h-screen ">
        <div className=" ">
          <div className="flex w-full h-16 justify-center px-6">
            <img
              className="pt-2"
              src="https://www.designfreelogoonline.com/wp-content/uploads/2019/02/00645-Paint-04.png"
              alt=""
            />
            <p className="pt-2 text-5xl text-primary font-bold tracking-widest ">Artsy</p>
          </div>
          <div className="mt-10">
            <p className="lg:text-5xl uppercase tracking-widest text-3xl text-center text-primary font-bold px-6">
              {text} <Cursor />
            </p>
          </div>
        </div>
        <div className="px-6 pb-12 ">
          <div className="flex justify-center lg:pt-24 flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-7/12 lg:w-5/12 mb-12 md:mb-0 h-96 overflow-hidden relative">
              <p className="text-5xl md:text-7xl font-extrabold whitespace-nowrap border-white text-white border-b-4 pb-2 absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                SIGN UP
              </p>

              <img
                src="https://www.canvashi.com/images/ContemporaryArt/Contemporary%20Art%20%20XB10A.jpg"
                className="w-full h-full object-fill"
                alt="Phone"
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
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    placeholder="Full Name"
                    ref={name}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="email"
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
                <div className="mb-6">
                  <input
                    type="number"
                    min={0}
                    className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    placeholder="Phone Number"
                    ref={phonenumber}
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
                    ref={cnicfield}
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck3"
                      onClick={() => setAcceptTerms(!acceptTerms)}
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
                {loadSignUp ? (
                  <Loader />
                ) : (
                  <>
                    <button
                      onClick={signUpwithEmail}
                      type="submit"
                      className="inline-block px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light">
                      Create Account
                    </button>

                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                      <p className="text-center font-semibold mx-4 mb-0">OR</p>
                    </div>

                    <p
                      onClick={signInWithGoogle}
                      className="px-7 py-3 border border-slate-300 text-slate-400 font-medium text-sm leading-snug uppercase rounded-lg shadow-md focus:no-underline hover:text-slate-600 focus:text-slate-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out hover:no-underline w-full flex justify-center items-center mb-3"
                      href="#!"
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
                      <p onClick={() => navigate('/signin')}>
                        Already have an Account?{' '}
                        <span className="text-primary hover:text-primary focus:text-primary hover:underline hover:underline-offset-2 cursor-pointer">
                          Sign In
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </RegistrationLayout>
  );
}
