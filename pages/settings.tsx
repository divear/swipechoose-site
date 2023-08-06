import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Meta from "../components/Meta";
import { signOut, auth } from "../components/firebase";
import signoffImg from "../public/signoff.svg"
import Image from 'next/image';

function Settings() {
	const [welc, setWelc] = useState(false);
	const [sort, setSort] = useState(false);
	const [isSingedIn, setIsSingedIn] = useState(false);
	useEffect(() => {
		localStorage.setItem("wantsWelcome", welc.toString());
	}, [welc]);
	useEffect(() => {
		localStorage.setItem("sort", sort ? "true" : "false");
		console.log(localStorage.getItem("sort") == "true")

	}, [sort]);
	useEffect(() => {
		setSort(localStorage.getItem("sort") == "true" ? true : false);
		console.log(localStorage.getItem("sort"))
		setIsSingedIn(!!localStorage.getItem("uid"));
	}, [])
	function signoff() {
		signOut(auth);
		localStorage.clear();
		window.location.reload();
	}


	return (
		<div className="content">
			<Nav />
			<Meta title="Swipechoose" />
			<h1>Settings</h1>
			{/* todo: make this work */}
			<div className="settings">
				<button
					onClick={signoff}
					className={isSingedIn ? "signoff" : "no"}
				>
					<Image className="signoffSvg" src={signoffImg} width={50} alt="signoff" />
					sign off
				</button>
				<div className="showWelc">
					<input
						onClick={() => setWelc(!welc)}
						className="checkbox"
						type="checkbox"
					// checked={welc}
					/>
					Show the &quot;Hi, I&apos;m new to Swipechoose!&quot;
					posts
				</div>
				<div className="sorting">
					<h3>Sort by:</h3>
					<button disabled={!sort} onClick={() => setSort(!sort)}>
						For you
					</button>
					/{" "}
					<button disabled={sort} onClick={() => setSort(!sort)}>
						Following
					</button>
				</div>
			</div>
		</div >
	);
}

export default Settings;
