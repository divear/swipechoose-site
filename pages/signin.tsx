import React, { useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	auth,
	onAuthStateChanged,
	signOut,
} from "../components/firebase";
import Meta from "../components/Meta";

function Signin() {
	const [user, setUser] = useState<any>();

	function signin() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	function logOut() {
		signOut(auth);
	}
	useEffect(() => {
		if (!user) return;
		localStorage.setItem("uid", user?.uid);
		window.location.href = "/";
	}, [user]);

	return (
		<div>
			<Meta title={"Sign in"} />
			<h1 className="bigText">
				Let's start with making a Swipechoose account
			</h1>
			<div className="signin">
				<button className="bigButton" onClick={signin}>
					Sign in
				</button>
			</div>
			<h1>{user?.displayName}</h1>
			<h1>{user?.email}</h1>
			<h1>{user?.photoURL}</h1>
			<h1>{user?.uid}</h1>
		</div>
	);
}

export default Signin;
