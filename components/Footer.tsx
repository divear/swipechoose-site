import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, signOut, auth } from "../components/firebase";

function Footer() {
	const [isSingedIn, setIsSingedIn] = useState(false);

	useEffect(() => {
		setIsSingedIn(!!localStorage.getItem("uid"));
	}, []);
	function signoff() {
		// const provider = new GoogleAuthProvider();
		signOut(auth);

		localStorage.clear();
		window.location.reload();
	}
	return (
		<div className="footer">
			<button onClick={signoff} className={isSingedIn ? "signoff" : "no"}>
				sign off
			</button>
			<p className="footerText">divear 2023</p>
		</div>
	);
}

export default Footer;
