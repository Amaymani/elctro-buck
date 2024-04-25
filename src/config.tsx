import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD5M-CmGmEP_SBnjD2wkeSCR_MU45IMssI",
  authDomain: "electro-buck.firebaseapp.com",
  databaseURL: "https://electro-buck-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "electro-buck",
  storageBucket: "electro-buck.appspot.com",
  messagingSenderId: "58356154780",
  appId: "1:58356154780:web:1003d7319dee25628b0859"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};