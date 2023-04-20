import React, { useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	auth,
	onAuthStateChanged,
	signOut,
} from "../components/firebase";
import Meta from "../components/Meta";

console.log(window.location.hostname);

var serverDomain: any;

function Signin() {
	console.log(serverDomain);

	const [user, setUser] = useState<any>();
	const [count, setCount] = useState(0);

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
		if (window.location.hostname != "localhost") {
			serverDomain = "https://swipechoose.onrender.com/";
		} else {
			serverDomain = "http://localhost:4000/";
		}
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
			console.log(userCount[0].count + 1);
			localStorage.setItem("count", userCount[0].count + 1);
			setCount(userCount[0].count + 1);

			const arr = [Remail, Rusername, Rpfp, Rfollow];
			const response = await fetch(`${serverDomain}users`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arr),
			});
			console.log(response);
			window.location.href = "/";
		})();
		localStorage.setItem("uid", user?.uid);
		localStorage.setItem("username", user?.displayName);
		localStorage.setItem("pfp", user?.photoURL);
		console.log("set stor");
	}, [user]);

	return (
		<div>
			<Meta title={"Sign in"} />
			<h1 className="bigText">
				Let&#39;s start with making a Swipechoose account
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
			<h1>{count}</h1>
		</div>
	);
}

export default Signin;
