import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../public/logo.png";

function Nav() {
	const [pfp, setPfp] = useState<any>("");
	const [username, setUsername] = useState<any>("");
	const [count, setCount] = useState<any>();
	const [isSingedIn, setIsSingedIn] = useState(false);
	useEffect(() => {
		setPfp(localStorage.getItem("pfp"));
		setUsername(localStorage.getItem("username"));
		setCount(localStorage.getItem("count"));
		setIsSingedIn(!!localStorage.getItem("uid"));
	}, []);

	return (
		<div>
			<h1>
				<Link className="logo" href="/">
					<Image className="logo" src={logo} alt="logo" />
				</Link>
				<div
					onClick={() => (window.location.href = `/user/${count}`)}
					className={isSingedIn ? "profile" : "no"}
				>
					<h2 className="floatLeft username">{username}</h2>
					<img
						width={50}
						height={50}
						className="pfp"
						alt="pfp"
						src={
							pfp ||
							"https://i.pinimg.com/originals/91/2c/e1/912ce19bfeadb1e9e2b7cee8f0a4f1bc.jpg"
						}
					/>
				</div>
				<button
					onClick={() => (window.location.href = "/signin")}
					className={!isSingedIn ? "signInButton" : "no"}
				>
					sign in
				</button>
			</h1>
		</div>
	);
}

export default Nav;
