import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../public/logo.png";
import settings from "../public/settings.svg";
import { signOut, auth } from "../components/firebase";

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
	function signoff() {
		signOut(auth);
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div>
			<h1>
				<Link className="logo" href="/">
					<Image className="logo" src={logo} alt="logo" />
				</Link>
				<div className={isSingedIn ? "profile" : "no"}>
					<div className="links">
						<button
							onClick={signoff}
							className={isSingedIn ? "signoff" : "no"}
						>
							sign off
						</button>
						<Image
							onClick={() => (window.location.href = "/settings")}
							width={50}
							src={settings}
							alt="Settings"
						/>
					</div>
					<Image
						onClick={() =>
							(window.location.href = `/user/${count}`)
						}
						title={username}
						width={50}
						height={50}
						className="smallPfp"
						alt="pfp"
						src={
							pfp ||
							"https://firebasestorage.googleapis.com/v0/b/picture-database.appspot.com/o/images%2F6525a08f1df98a2e3a545fe2ace4be47.jpg?alt=media"
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
