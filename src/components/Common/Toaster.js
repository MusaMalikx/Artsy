import { Notification } from 'rsuite';
export default function Toaster(toaster, typeOf, message) {
  toaster.push(<Notification type={typeOf} header={message} duration={3000}></Notification>, {
    placement: 'topEnd'
  });
  setTimeout(() => {
    toaster.clear();
  }, 3000);
}
