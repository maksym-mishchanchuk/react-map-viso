import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3JiIsggxmguyvhZ3fBgKBagrQV6gHP2c",
  authDomain: "react-map-viso.firebaseapp.com",
  projectId: "react-map-viso",
  storageBucket: "react-map-viso.appspot.com",
  messagingSenderId: "336664718869",
  appId: "1:336664718869:web:bfe35f00ca92b92f15281c",
  measurementId: "G-SF0HGMFW9D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const questCollectionRef = collection(db, 'quests');

export { app, analytics, db, questCollectionRef };
