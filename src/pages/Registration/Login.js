import React from 'react'
import RegistrationLayout from "../../components/Layouts/RegistrationLayout";
export default function Login() {
  return (
    <RegistrationLayout title={"Login"}>
      <section class="h-screen ">
        <div className='font-serif'>
          <div className='flex w-full h-16 justify-center px-6'>
            <img className='pt-2' src="https://static.vecteezy.com/ti/vecteur-libre/p3/6559180-peinture-logo-full-color-luxury-design-style-creative-brush-concept-vectoriel.jpg" alt="" />
            <p className='pt-2  text-5xl text-yellow-600 font-bold tracking-widest ' >Artsy</p>
          </div>
          <div className='mt-10'>
            <p className='lg:text-7xl text-5xl text-center text-yellow-900 font-bold px-6'>Good to see you again!</p>
          </div>
        </div>
        <div class="px-6 py-12 h-full ">
          <div class="flex justify-center lg:pt-24 flex-wrap h-full g-6 text-gray-800">
            <div class="md:w-7/12 lg:w-5/12 mb-12 md:mb-0 h-2/4 overflow-hidden relative">
              <p className=' text-7xl md:text-8xl font-extrabold whitespace-nowrap border-white text-white border-b-4 pb-2 absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 md:tracking-widest  '>LOG IN</p>
              
              <img
                src="https://www.paintingbibi.com/images/ContemporaryArt/Palette%20Knife%20Contemporary%20Art%20%20L55A.jpg"
                className="w-full h-full object-fill"
                alt="Phone image"
              />
            </div>
            <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form>
                <div class="mb-6 flex w-full justify-center gap-4">
                  <div className='border hover:text-yellow-700 hover:border-yellow-700 w-16 h-16 flex flex-col  cursor-pointer text-center rounded-full pt-4'>
                    <i className="fa-solid fa-user "></i>
                    <button className='text-sm'>Buyer</button>
                  </div>
                  <div className='border hover:text-yellow-700 hover:border-yellow-700 flex flex-col  w-16 h-16 cursor-pointer text-center rounded-full pt-4'>
                    <i className="fa-solid fa-user-pen"></i>
                    <button className='text-sm'>Artist</button>
                  </div>
                  <div className='border hover:text-yellow-700 hover:border-yellow-700 flex flex-col  w-16 h-16 cursor-pointer text-center rounded-full pt-4'>
                    <i className="fa-solid fa-user-tie"></i>
                    <button className='text-sm'>Admin</button>
                  </div>
                </div>

                <div class="mb-6">
                  <input
                    type="text"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                    placeholder="Email address"
                  />
                </div>

                <div class="mb-6">
                  <input
                    type="password"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                    placeholder="Password"
                  />
                </div>

                <div class="flex justify-between items-center mb-6">
                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-yellow-600 checked:border-yellow-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck3"
                    />
                    <label class="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                    >Remember me</label
                    >
                  </div>
                  <a
                    href="#!"
                    class="text-yellow-600 hover:text-yellow-700 focus:text-yellow-700 active:text-yellow-800 duration-200 transition ease-in-out"
                  >Forgot Password?</a
                  >
                </div>


                <button
                  type="submit"
                  class="inline-block px-7 py-3 bg-yellow-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign in
                </button>

                <div
                  class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                >
                  <p class="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <a
                  class="px-7 py-3 border border-slate-300 text-slate-400 font-medium text-sm leading-snug uppercase rounded-lg shadow-md focus:no-underline hover:text-slate-600 focus:text-slate-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out hover:no-underline w-full flex justify-center items-center mb-3"

                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >

                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 50 50"
                    className='h-4 w-4 mr-2'
                  >
                    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>Continue with Google
                </a>

                <div className='mt-6 text-center'>
                  <p>Need an Account? <a href="#" className='text-yellow-700'>Sign Up</a></p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </RegistrationLayout>
  )
}
