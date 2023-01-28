import React from 'react';
import { BsWhatsapp, BsTwitter } from 'react-icons/bs';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-cyan-200 via-primary to-cyan-200 pt-20 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-blueGray-700 uppercase">
              Get your artworks today!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond within 24 hours.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 rounded-full outline-none focus:outline-none mr-2"
                type="button">
                <BsTwitter className="w-full" />
              </button>
              <button
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 rounded-full outline-none focus:outline-none mr-2"
                type="button">
                <FaFacebookF className="w-full" />
              </button>
              <button
                className="bg-white text-pink-600 shadow-lg font-normal h-10 w-10  rounded-full outline-none focus:outline-none mr-2"
                type="button">
                <AiOutlineInstagram className="w-full" />
              </button>
              <button
                className="bg-white text-green-800 shadow-lg font-normal h-10 w-10 rounded-full outline-none focus:outline-none mr-2"
                type="button">
                <BsWhatsapp className="w-full" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase  text-blueGray-700 text-sm font-semibold mb-2">
                  Company
                </span>
                <ul className="list-unstyled">
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    About Auctions
                  </li>
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Our Services
                  </li>
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Why Us
                  </li>
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    How it Works
                  </li>
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Auction Packages
                  </li>
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Sample Auctions
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase  text-blueGray-700 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    About Us
                  </li>
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Careers
                  </li>
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Frequently Asked Questions
                  </li>
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Terms & Conditions
                  </li>
                  <li className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Privacy Policy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm  text-blueGray-700 font-semibold py-1">
              Copyright © <span id="get-current-year">2023 by Artsy Auction</span> .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
