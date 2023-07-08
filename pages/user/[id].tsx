import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import Nav from "../../components/Nav";
import Image from "next/image";
import point from "../../public/point.png";

var serverDomain: string;

function UserPage() {
	const [data, setData] = useState<any>();
	const [username, setUsername] = useState("");
	const [pfp, setPfp] = useState("");
	const [email, setEmail] = useState("");
	const [karma, setKarma] = useState(0);
	useEffect(() => {
		if (window.location.hostname != "localhost") {
			serverDomain = "https://swipechoose.onrender.com/";
		} else {
			serverDomain = "http://localhost:4000/";
		}
		async function getBlogs() {
			try {
				const tid = window.location.pathname.replace("/user/", "");

				console.log(tid);

				const response = await fetch(`${serverDomain}users/${tid}`);
				console.log(`${serverDomain}users/${tid}`);

				const jsonData = await response.json();
				setData(jsonData.reverse());
				console.log(jsonData);
				setUsername(jsonData[0].username);
				setPfp(jsonData[0].pfp);
				setEmail(jsonData[0].email);
				let k = 0;
				jsonData.forEach((d: any, i: number) => {
					k += d.points;
				});
				console.log(k);
				setKarma(k);
			} catch (error) {
				console.log(error);
			}
		}
		getBlogs();
	}, []);
	// when the follow button is pressed
	async function follow() {
		console.log("follow");
		const signedUid = localStorage.getItem("count");
		const followedUid = data[0].user_id;

		const getResponse = await fetch(`${serverDomain}users/${signedUid}`);
		const jsonData = await getResponse.json();
		const following = JSON.parse(jsonData[0].following);
		console.log(following);
		following.push(followedUid);
		console.log(following);

		const response = await fetch(`${serverDomain}users/${signedUid}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(following),
		});
	}
	return (
		<div>
			<Nav />
			<Meta title="Swipechoose" />
			<div className="content">
				<p>{!data && "loading, something something our fault"}</p>
				<div className="userInfo">
					<img className="pfp" src={pfp} alt="" />
					<div className="bigUsername">
						<h1>{username}</h1>
						<i>{email}</i>
						<p className="">Karma: {karma}</p>
					</div>
					<button onClick={follow} className="follow">
						follow
					</button>
				</div>
				<div className="imgGrid">
					{data &&
						data.map((d: any, i: number) => {
							return (
								<div key={i}>
									<img
										className="userImage"
										src={d.photo_url}
										alt=""
									/>
									<div className="userLikeCount">
										{d.title}
										<div className="floatRight">
											<Image
												width={30}
												src={point}
												alt=" likes"
											></Image>
											{d.points}
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default UserPage;
