import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../public/logo.png";

function Nav() {
	const [pfp, setPfp] = useState<any>("");
	const [username, setUsername] = useState<any>("");
	useEffect(() => {
		setPfp(localStorage.getItem("pfp"));
		setUsername(localStorage.getItem("username"));
	}, []);

	return (
		<div>
			<h1>
				<div className="profile">
					<Link className="logo" href="/">
						<Image className="logo" src={logo} alt="logo" />
					</Link>
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
			</h1>
		</div>
	);
}

export default Nav;
