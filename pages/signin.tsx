import React, { useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	auth,
	onAuthStateChanged,
	signOut,
} from "../components/firebase";
import Meta from "../components/Meta";
import Image from "next/image";
import googleImg from "../public/google.svg"

// console.log(window.location.hostname);

var serverDomain: any;

function Signin() {
	console.log(serverDomain);

	const [user, setUser] = useState<any>();
	const [s, setS] = useState(false);

	function signin() {
		if (s) return;
		setS(true);
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
			const Rfollow = "[]";
			const id = user?.uid;

			// console.log(Remail);

			//check for duplicate users
			const pastUsersResponse = await fetch(`${serverDomain}users-email/${Remail}`);
			const pastUsersjsonData = await pastUsersResponse.json();
			console.log(pastUsersjsonData[0].user_id);

			// set the id as the previosly signed user id
			console.log(pastUsersjsonData[0].user_id)
			localStorage.setItem("count", pastUsersjsonData[0].user_id);


			const arr = [Remail, Rusername, Rpfp, Rfollow];
			if (pastUsersjsonData === "no users") {
				console.log("USER DOESNT EXIST YET!!!!!!!!!!!§")

				const userCountR = await fetch(`${serverDomain}users-number`);
				const userCount = await userCountR.json();
				console.log(userCount[0].count + 1);
				localStorage.setItem("count", userCount[0].count + 1);

				const response = await fetch(`${serverDomain}users`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(arr),
				});

				const boilerPost = await fetch(`${serverDomain}posts`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([
						{ user_id: userCount[0].count + 1 },
						{ title: "Hi, I'm new to Swipechoose!" },
						{
							imgLink:
								"https://firebasestorage.googleapis.com/v0/b/picture-database.appspot.com/o/images%2FnewUser.png?alt=media",
						},
					]),
				});
				console.log(boilerPost);
			}
			window.location.href = "/";
		})();
		localStorage.setItem("uid", user?.uid);
		localStorage.setItem("username", user?.displayName);
		localStorage.setItem("pfp", user?.photoURL);
		localStorage.setItem("wantsWelcome", "true");
	}, [user]);

	return (
		<div onClick={signin}>
			<Meta title={"Sign in"} />
			<h1 className="bigText">
				Let&#39;s start with making a Swipechoose account
			</h1>
			<div className="signin">
				<button className="bigButton">
					<Image src={googleImg} width={50} alt="G" />
					Sign in with Google</button>
			</div>
		</div>
	);
}

export default Signin;
