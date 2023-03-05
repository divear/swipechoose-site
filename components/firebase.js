// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";

console.log(process.env);
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,

	authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,

	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,

	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,

	messagingSenderId: process.env.NEXT_PUBLIC_SENDERID,

	appId: process.env.NEXT_PUBLIC_APPID,

	measurementId: process.env.NEXT_PUBLIC_MESID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
	getStorage,
	ref,
	app,
	uploadBytes,
	auth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	onAuthStateChanged,
	signOut,
};
