import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Meta from "../components/Meta";

function Settings() {
	const [welc, setWelc] = useState(false);
	useEffect(() => {
		localStorage.setItem("wantsWelcome", welc.toString());
	}, [welc]);

	return (
		<div className="content">
			<Nav />
			<Meta title="Swipechoose" />
			<h1>Settings</h1>
			{/* todo: make this work */}
			<p className="settings">
				<input
					onClick={() => setWelc(!welc)}
					className="checkbox"
					type="checkbox"
					// checked={welc}
				/>
				Show the <i>"Hi, I'm new to Swipechoose!" </i> posts
			</p>
		</div>
	);
}

export default Settings;
