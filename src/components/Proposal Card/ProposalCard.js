import React from 'react'
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { useState } from 'react';
import ProposalDrawer from './ProposalDrawer';
export default function ProposalCard() {
    const text = "Lorem ipsum dolorsad sit amet consectetur, adipisicing elit. Fugit nihil rem corporis molestiae mollitia! Maiores perspiciatis animi exercitationem, voluptate omnis odit consectetur nam nisi esse, ipisicing elit. Fugit nihil rem corporis molestiae mollitia! Maiores perspiciatis animi exercitationem, voluptate omnis odit consectetur nam nisi esse, ducimus porro architecto? Corporis, suscipit ducimus porro architecto? Corporis, suscipit."
    const [showDrawer, SetShowDrawer] = useState(false);
    return (
        <>
            <div onClick={()=>SetShowDrawer(true)} className='border font-serif my-5 p-5 hover:cursor-pointer hover:bg-slate-100'>
                <div className='flex gap-6'>
                    <div className=' rounded-full relative w-24 h-24 overflow-hidden'>
                        <img className=' w-full h-full object-cover ' src="https://scontent.flhe3-2.fna.fbcdn.net/v/t1.6435-1/131339402_2890381564525861_3935956292302524806_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHVbrQLjq9EiBwlLc66MXPa8KROrODhYeHwpE6s4OFh4SQlKw33W2x34a3ethtToZ8mB0K10n--DLRhBsuzzNHo&_nc_ohc=sgWbe9MBLPsAX94Xehw&_nc_ht=scontent.flhe3-2.fna&oh=00_AfBMw6x3JJ3bgvc0-JszwqiGx4dvOvP69PSgh8WO66Wasw&oe=63B923C8" alt="" />
                    </div>
                    <div className='font-bold flex justify-between w-full'>
                        <div>
                            <p className='text-green-500 text-lg'>Abdullah The Prodigy</p>
                            <p className='font-light'>Faisalabad, Punjab, Pakistan</p>
                        </div>
                        <div className='my-auto text-3xl hover:text-green-500'>
                            <ArrowRightLineIcon />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mt-6'>
                    <p className='text-xl font-bold '> Expected : <span className=' text-red-500 '> Rs. 5000</span>   </p>
                    <p>{text.slice(0, 250) + " ..."}</p>
                </div>
            </div>
           { showDrawer ===true ? <ProposalDrawer setOpen = {SetShowDrawer} /> : ""}
        </>
    )
}
