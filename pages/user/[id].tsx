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
	}, []);
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
					</div>
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
