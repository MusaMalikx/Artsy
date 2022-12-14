import React from 'react'
import { Popover, Nav, Whisper, Dropdown } from 'rsuite';
import NoticeIcon from '@rsuite/icons/Notice';
import { Icon } from "@rsuite/icons";
import NotificationDescription from './NotificationDescription';
const renderSpeaker = ({ onClose, left, top, className, ...rest }, ref) => {
    return (
        <Popover ref={ref} className={className + " mr-4"} style={{ left, top }} full>
            <div className=' w-full h-96 overflow-y-scroll'>
                <div className=' bg-teal-600 p-4'>
                    <p className='text-white text-sm text-center font-bold'>Notifications</p>
                </div>
                <NotificationDescription />
                <NotificationDescription />
                <NotificationDescription />
                <NotificationDescription />
                <NotificationDescription />
                <NotificationDescription />
                <NotificationDescription />
                <NotificationDescription />
                <NotificationDescription />
            </div>
        </Popover>
    );
};



export default function Notification() {
    return (
        <Dropdown.Menu title="Notifications" placement="rightStart" icon={<Icon as={NoticeIcon} />}>
                <div className=' w-full h-96 overflow-hidden overflow-y-scroll'>
                    <NotificationDescription />
                    <NotificationDescription />
                    <NotificationDescription />
                    <NotificationDescription />
                    <NotificationDescription />
                    <NotificationDescription />
                    <NotificationDescription />
                </div>
        </Dropdown.Menu>
    );
}
