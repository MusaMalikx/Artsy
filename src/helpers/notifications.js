import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const sendNotification = async (auth, id, text) => {
  await updateDoc(doc(db, 'notify', auth?.user.firebaseid), {
    notifications: arrayUnion({
      id,
      text,
      date: Timestamp.now()
    })
  });
};

export { sendNotification };
