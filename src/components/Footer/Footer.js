import React from 'react';
import { BsWhatsapp, BsTwitter } from 'react-icons/bs';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-primary relative z-10">
      <div className="lg:px-40 py-20 flex justify-around flex-col-reverse md:flex-row">
        <div className="max-w-lg">
          <h2 className="text-white font-bold h2 uppercase tracking-widest">
            Get your auctions today
          </h2>
          <button
            className="btn bg-green-600 rounded-3xl px-4 py-2 my-5 text-white btn-outline-primary"
            // onClick={() => router.push('/get-in-touch')}
          >
            Get in touch
          </button>
          <div className="flex justify-between flex-col md:flex-row">
            <div className="space-y-5 mt-8 text-[12px] uppercase text-white font-[500]">
              <p className="hover:underline underline-offset-1 cursor-pointer">Company</p>
              <p className="hover:underline underline-offset-1 cursor-pointer">About Auctions</p>
              <p className="hover:underline underline-offset-1 cursor-pointer">Our Services</p>
              <p className="hover:underline underline-offset-1 cursor-pointer">Why Us</p>
              <p className="hover:underline underline-offset-1 cursor-pointer">How It Works</p>
              <p className="hover:underline underline-offset-1 cursor-pointer">Auction Packages</p>
              <p className="hover:underline underline-offset-1 cursor-pointer">Sample Auctions</p>
            </div>
            <div className="space-y-5 mt-8 text-[12px] uppercase text-white font-[500]">
              <p className="hover:underline underline-offset-1 cursor-pointer">Quick Links</p>
              <p
                className="hover:underline underline-offset-1 cursor-pointer"
                // onClick={() => router.push('/careers')}
              >
                Careers
              </p>
              <p className="hover:underline underline-offset-1 cursor-pointer">
                Frequently Asked Questions
              </p>
              <p
                className="hover:underline underline-offset-1 cursor-pointer"
                // onClick={() => router.push('/terms-and-conditions')}
              >
                Terms & Conditions
              </p>
              <p
                className="hover:underline underline-offset-1 cursor-pointer"
                // onClick={() => router.push('/privacy-policy')}
              >
                Privacy Policy
              </p>
            </div>
          </div>
        </div>
        <div className="mb-10">
          {/* <img src="" alt="icon" width={100} height={50} /> */}
          <div className="flex flex-wrap gap-3 mt-10 text-primary">
            <div className="bg-white p-2 rounded-full cursor-pointer hover:bg-green-200">
              <AiOutlineInstagram size={20} />
            </div>
            <div className="bg-white p-2 rounded-full cursor-pointer hover:bg-green-200">
              <FaFacebookF size={20} />
            </div>
            <div className="bg-white p-2 rounded-full cursor-pointer hover:bg-green-200">
              <BsTwitter size={20} />
            </div>
            <div className="bg-white p-2 rounded-full cursor-pointer hover:bg-green-200">
              <BsWhatsapp size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
