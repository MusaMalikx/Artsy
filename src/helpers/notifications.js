import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const sendNotification = async (fid, id, text) => {
  await updateDoc(doc(db, 'notify', fid), {
    notifications: arrayUnion({
      id,
      text,
      date: Timestamp.now()
    })
  });
};

export { sendNotification };
