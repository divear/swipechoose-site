import React, { useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	auth,
	onAuthStateChanged,
	signOut,
} from "../components/firebase";
import Meta from "../components/Meta";
const serverDomain =
	"http://localhost:4000/" || "https://swipechoose.onrender.com/";

function Signin() {
	console.log(serverDomain);

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
	useEffect(() => {
		if (!user) return;
		(async function () {
			const Remail = user?.email;
			const Rpfp = user?.photoURL;
			const Rusername = user?.displayName;
			const Rfollow = "[0, 0]";
			// const id = user?.uid;
			console.log(user);

			const userCountR = await fetch(`${serverDomain}users-number`);
			const userCount = await userCountR.json();
			console.log(userCount[0].count);
			localStorage.setItem("count", userCount[0].count);

			const arr = [Remail, Rusername, Rpfp, Rfollow];
			const response = await fetch(`${serverDomain}users`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arr),
			});
			console.log(response);
		})();
		localStorage.setItem("uid", user?.uid);
		localStorage.setItem("username", user?.displayName);
		localStorage.setItem("pfp", user?.photoURL);
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
