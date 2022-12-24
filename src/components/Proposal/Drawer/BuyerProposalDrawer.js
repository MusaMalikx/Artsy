import React, { useState } from 'react';
import { Drawer } from 'rsuite';
import ArtistProposal from '../../Modals/ArtistProposal';
export default function ProposalDrawer({ setOpen }) {
  const [openField, setOpenField] = useState(false);
  const text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius molestiae accusamus distinctio atque consequuntur tempora dolore veniam aut accusantium pariatur temporibus fugiat illum, quis nobis fugit beatae soluta numquam unde!';
  return (
    <>
      <Drawer size="xs" open={true} onClose={() => setOpen(false)}>
        <Drawer.Body>
          <div className="   w-full mt-16 rounded-lg flex justify-center flex-col align-middle  ">
            <div className="flex flex-col items-center gap-6">
              <div className=" rounded-full relative w-40 overflow-hidden">
                <img
                  className=" w-full h-full object-cover "
                  src="https://www.skintransform.co.uk/wp-content/uploads/2016/10/Men-Face4.jpg"
                  alt=""
                />
              </div>
              <div className="font-bold text-center justify-between w-full">
                <p className="text-green-500 text-xl">John D. Moore</p>
                <p className="font-light">Lahore, Punjab, Pakistan</p>
                <p className=" underline cursor-pointer hover:text-slate-500 ">View Profile</p>
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <p className="text-lg font-bold ">
                {' '}
                Expected : <span className=" text-red-500 "> Rs. 5000</span>{' '}
              </p>
              <p className="text-lg font-bold mt-6">Description</p>
              <p className="text-justify">{text}</p>
            </div>
            <button
              onClick={() => setOpenField(true)}
              className="mt-10 w-full focus:outline-none border py-3 rounded-lg bg-primary hover:bg-cyan-700 text-white font-bold ">
              Bid Now
            </button>
            {<ArtistProposal isOpen={openField} setIsOpen={setOpenField} />}
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
}
