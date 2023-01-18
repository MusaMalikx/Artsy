import React from 'react';
import { Dropdown } from 'rsuite';
import NoticeIcon from '@rsuite/icons/Notice';
import { Icon } from '@rsuite/icons';
import NotificationDescription from './Description/NotificationDescription';

export default function Notification() {
  return (
    <Dropdown.Menu title="Notifications" placement="rightStart" icon={<Icon as={NoticeIcon} />}>
      <div className=" w-full h-96 overflow-hidden overflow-y-scroll">
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
