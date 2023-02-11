import { arrayUnion, doc, Timestamp, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const sendNotification = async (fid, id, text) => {
  const docRef = doc(db, 'notify', fid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      notifications: arrayUnion({
        id,
        text,
        date: Timestamp.now()
      })
    });
  } else {
    await setDoc(docRef, {
      notifications: arrayUnion({
        id,
        text,
        date: Timestamp.now()
      })
    });
  }
};

export { sendNotification };
