import React from 'react'
import { Drawer } from 'rsuite';



export default function ProposalDrawer({ setOpen }) {
    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius molestiae accusamus distinctio atque consequuntur tempora dolore veniam aut accusantium pariatur temporibus fugiat illum, quis nobis fugit beatae soluta numquam unde!"
    return (
        <>
            <Drawer size='xs' open={true} onClose={() => setOpen(false)}>
                <Drawer.Body>
                    <div className='   w-full mt-16 rounded-lg flex justify-center flex-col align-middle  '>
                        <div className='flex flex-col items-center gap-6'>
                            <div className=' rounded-full relative w-40 overflow-hidden'>
                                <img className=' w-full h-full object-cover ' src="https://scontent.flhe3-2.fna.fbcdn.net/v/t1.6435-1/131339402_2890381564525861_3935956292302524806_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHVbrQLjq9EiBwlLc66MXPa8KROrODhYeHwpE6s4OFh4SQlKw33W2x34a3ethtToZ8mB0K10n--DLRhBsuzzNHo&_nc_ohc=sgWbe9MBLPsAX94Xehw&_nc_ht=scontent.flhe3-2.fna&oh=00_AfBMw6x3JJ3bgvc0-JszwqiGx4dvOvP69PSgh8WO66Wasw&oe=63B923C8" alt="" />
                            </div>
                            <div className='font-bold text-center justify-between w-full'>

                                    <p className='text-green-500 text-xl'>Abdullah The Prodigy</p>
                                    <p className='font-light'>Faisalabad, Punjab, Pakistan</p>
                                    <p className=' underline cursor-pointer hover:text-slate-500 '>View Profile</p>

                            </div>
                           
                        </div>
                        <div className='flex flex-col mt-6'>
                                <p className='text-lg font-bold '> Expected : <span className=' text-red-500 '> Rs. 5000</span>   </p>
                                <p className='text-lg font-bold mt-6'>Description</p>
                                <p className='text-justify'>{text}</p>
                        </div>
                        <button className='mt-10 w-full focus:outline-none border py-3 rounded-lg bg-black text-white font-bold '>Bid Now</button>
                    </div>
                </Drawer.Body>
            </Drawer>
        </>
    )
}
