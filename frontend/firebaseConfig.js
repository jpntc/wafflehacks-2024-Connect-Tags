import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwLEstTpF-meLBMjX5SfiuPKiHc8tKRME",
  authDomain: "fastconnect-f08eb.firebaseapp.com",
  projectId: "fastconnect-f08eb",
  storageBucket: "fastconnect-f08eb.appspot.com",
  messagingSenderId: "328880162099",
  appId: "1:328880162099:web:3f9919ea3b1c4ea30f2a46",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
