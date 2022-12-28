// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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

export { getStorage, ref, app, uploadBytes };
