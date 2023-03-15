import React from "react";
import { GoogleAuthProvider, signOut, auth } from "../components/firebase";

function Footer() {
	function signoff() {
		// const provider = new GoogleAuthProvider();
		signOut(auth);

		localStorage.clear();
		window.location.reload();
	}
	return (
		<div className="footer">
			<button onClick={signoff} className="signoff">
				sign off
			</button>
			<p className="footerText">divear 2023</p>
		</div>
	);
}

export default Footer;
