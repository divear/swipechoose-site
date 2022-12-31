import Link from "next/link";
import React from "react";
import Image from "next/image";

function Nav() {
	return (
		<div>
			<h1>
				<Link href="/">Swipechoose</Link>
				<div className="profile">
					<h2 className="floatLeft username">username</h2>
					<img
						width={50}
						height={50}
						className="pfp"
						alt="pfp"
						src={
							"https://i.pinimg.com/originals/91/2c/e1/912ce19bfeadb1e9e2b7cee8f0a4f1bc.jpg"
						}
					/>
				</div>
			</h1>
		</div>
	);
}

export default Nav;
