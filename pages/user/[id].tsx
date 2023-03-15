import React, { useEffect, useState } from "react";

import Meta from "../../components/Meta";
import Nav from "../../components/Nav";
const serverDomain =
	"http://localhost:4000/" || "https://swipechoose.onrender.com/";
function UserPage() {
	const [id, setId] = useState();

	const [data, setData] = useState<any>();
	const [username, setUsername] = useState("");
	const [pfp, setPfp] = useState("");
	const [email, setEmail] = useState("");
	useEffect(() => {
		async function getBlogs() {
			try {
				const tid = window.location.search;
				const urlParams = new URLSearchParams(tid);
				console.log(urlParams);

				setId(id);
				const response = await fetch(`${serverDomain}users/${tid}`);
				console.log(`${serverDomain}users/${tid}`);

				const jsonData = await response.json();
				setData(jsonData);
				console.log(jsonData);
				setUsername(jsonData[0].username);
				setPfp(jsonData[0].pfp);
				setEmail(jsonData[0].email);
			} catch (error) {
				console.log(error);
			}
		}
		getBlogs();
		if (!localStorage.getItem("uid")) {
			window.location.href = "signin";
		}
	}, []);
	return (
		<div>
			<Nav />
			<Meta title="Swipechoose" />
			<div className="content">
				<p>{!data && "loading, something something our fault"}</p>
				<img className="pfp" src={pfp} alt="" />
				<h1>{username}</h1>
				<i>{email}</i>
				{data &&
					data.map((d: any, i: number) => {
						return (
							<div>
								<h2>{d.title}</h2>
								<img
									className="pickImage"
									src={d.photo_url}
									alt=""
								/>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default UserPage;
