import React, { useRef, useState } from 'react';
import RegistrationLayout from '../../components/Layouts/RegistrationLayout';
import { FcGoogle } from 'react-icons/fc';
import Lottie from 'react-lottie-player';
import lottie from '../../assets/json/web-design-animation.json';
import { useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import {
  cnicValidate,
  emailValidate,
  nameValidate,
  passValidate,
  phoneValidate
} from '../../helpers/credential-validators';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import firebaseApp from '../../utils/firebase';
import { Button, Modal } from 'rsuite';
import API from '../../api/server';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/reducer/userReducer';

/*
Component for the admin sign-up page.
Allows administrators to securely register using a secrect key and access the admin dashboard.
Handles authentication and user input validation.
*/
const AdminSignUp = () => {
  const [text] = useTypewriter({
    words: ['Welcome to Artsy!', 'Good to see you again!', "Let's create a new account!"],
    loop: true,
    delaySpeed: 3000
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const phonenumber = useRef();
  const cnicfield = useRef();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const admincode = useRef();
  const toaster = useToaster();

  const [fromgoogle, setFromgoogle] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //The is function facilities registering admin using email and password
  const signUpWithEmail = async (e) => {
    if (
      emailValidate(email.current.value) &&
      passValidate(password.current.value) &&
      nameValidate(name.current.value) &&
      phoneValidate(phonenumber.current.value) &&
      cnicValidate(cnicfield.current.value)
    ) {
      e.preventDefault();
      console.log('success');
      setFromgoogle(false);
      handleOpen();

      // The signup API continued in signUpwithEmailandPassword function below
    } else {
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

  //API call for registering admin in via email and password
  const signUpwithEmailandPassword = async () => {
    console.log('Admin code', admincode.current.value);
    await API.post('/api/auth/admin/check', {
      phonenumber: phonenumber.current.value,
      cnic: cnicfield.current.value,
      code: admincode.current.value,
      fromgoogle: false
    })
      .then((res) => {
        console.log(res);
        if (name.current.value != '' && email.current.value != '' && password.current.value != '') {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then(async (userCredential) => {
              await API.post('/api/auth/admin/signup', {
                email: userCredential.user.email,
                firebaseid: userCredential.user.uid,
                name: name.current.value,
                phonenumber: phonenumber.current.value,
                cnic: cnicfield.current.value
              }).then((res) => {
                console.log(res);
                handleClose();
                Toaster(toaster, 'success', 'Account Created Successfully');
              });
            })
            .catch((error) => {
              const errorMessage = error.message;
              console.log(errorMessage);
              if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                handleClose();
                Toaster(toaster, 'error', 'Email already exists!');
              } else if (error.response) {
                if (error.response.data.message === 'EMAIL_EXISTS') {
                  handleClose();
                  Toaster(toaster, 'error', 'Incorrect Email or Password!');
                }
              } else if (
                errorMessage ===
                'Firebase: Password should be at least 6 characters (auth/weak-password).'
              ) {
                handleClose();
                Toaster(toaster, 'error', 'Password should be at least 6 characters');
              } else {
                handleClose();
                Toaster(toaster, 'error', errorMessage);
              }
            });
        } else {
          handleClose();
          Toaster(toaster, 'error', 'Input fields missing!');
        }
      })
      .catch((error) => {
        console.log(error.status, error.message);
        if (error.response) {
          if (error.response.data.message === 'PhoneNumber Already exists!') {
            handleClose();
            Toaster(toaster, 'error', 'PhoneNumber already exists!');
          } else if (error.response.data.message === 'cnic Already exists!') {
            handleClose();
            Toaster(toaster, 'error', 'Cnic already exists!');
          } else if (error.response.data.message === 'Admin Code Incorrect!') {
            Toaster(toaster, 'error', 'Admin Code Incorrect!');
          } else {
            handleClose();
            Toaster(toaster, 'error', error.response.data.message);
          }
        } else {
          Toaster(toaster, 'error', error.message);
        }
      });
  };

  //API call for registering admin in via SSO (Single Sign On) via Google Auth
  const signUpwithGoogle = async () => {
    console.log('Code for google:', admincode.current.value);
    await API.post('/api/auth/admin/check', {
      phonenumber: phonenumber.current.value,
      cnic: cnicfield.current.value,
      code: admincode.current.value,
      fromgoogle: true
    })
      .then((res) => {
        console.log(res);

        const auth = getAuth(firebaseApp);
        signInWithPopup(auth, new GoogleAuthProvider())
          .then(async (result) => {
            await API.post('/api/auth/admin/google/signup', {
              displayName: result.user.displayName,
              firebaseid: result.user.uid,
              email: result.user.email,
              imageURL: result.user.photoURL
            }).then((res) => {
              console.log(res);
              const newData = { ...res.data, usertype: 'admin' };
              localStorage.setItem('auth', JSON.stringify(newData));
              dispatch(setUser({ admin: true }));
              navigate('/admin/dashboard');
            });
          })
          .catch((error) => {
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
      })
      .catch((error) => {
        console.log(error.status, error.message);
        if (error.response) {
          if (error.response.data.message === 'Admin Code Incorrect!') {
            Toaster(toaster, 'error', 'Admin Code Incorrect!');
          } else {
            handleClose();
            Toaster(toaster, 'error', error.response.data.message);
          }
        } else {
          Toaster(toaster, 'error', error.message);
        }
      });
  };

  const checkSignupOption = () => {
    if (fromgoogle === true) signUpwithGoogle();
    else signUpwithEmailandPassword();
  };

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
              <p
                className="flex items-center justify-center mt-4 text-white rounded-lg shadow-all-rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setFromgoogle(true);
                  handleOpen();
                }}>
                <div className="px-4 py-3">
                  <FcGoogle size={20} />
                </div>
                <h1 className="px-4 py-3 w-5/6 text-base text-center text-gray-600 font-bold">
                  Sign up with Google
                </h1>
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/3"></span>
                <p className="text-xs text-center text-gray-500 uppercase">or</p>
                <span className="border-b w-1/3"></span>
              </div>
              <form>
                <div className="my-6">
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
                <div className="mt-8">
                  <button
                    type="submit"
                    onClick={signUpWithEmail}
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
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal size="xs" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Admin Code</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
          <input
            type="text"
            className="border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Enter Admin code"
            ref={admincode}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={checkSignupOption} color="green" appearance="primary">
            Sign Up
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </RegistrationLayout>
  );
};

export default AdminSignUp;
