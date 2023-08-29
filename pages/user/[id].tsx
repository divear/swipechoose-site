import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import Nav from "../../components/Nav";
import Image from "next/image";
import point from "../../public/point.png";
import Link from "next/link";

var serverDomain: string;

function UserPage() {
	const [data, setData] = useState<any>();
	const [username, setUsername] = useState("");
	const [pfp, setPfp] = useState("");
	const [email, setEmail] = useState("");
	const [following, setFollowing] = useState("");
	const [followers, setFollowers] = useState(0);
	const [karma, setKarma] = useState(0);
	const [isFollowed, setIsFollowed] = useState(false); //if the currently signed-in user follows this user
	const [isNoPosts, setIsNoPosts] = useState(false);
	const [isMine, setIsMine] = useState(false);
	const [followingList, setFollowingList] = useState<any>([])
	useEffect(() => {
		if (window.location.hostname != "localhost") {
			serverDomain = "https://swipechoose.onrender.com/";
		} else {
			serverDomain = "http://localhost:4000/";
		}
		async function getBlogs() {
			try {
				const tid = window.location.pathname.replace("/user/", "");
				if (tid == localStorage.getItem("count")) {
					setIsMine(true);
				}
				const response = await fetch(`${serverDomain}users/${tid}`);
				console.log(`${serverDomain}users/${tid}`);

				const jsonData = await response.json();
				setData(jsonData.reverse());
				console.log(jsonData);
				//check for no posts
				if (!jsonData[0]) {
					console.log("no posts");
					setIsNoPosts(true);
				}

				//check for follow
				if (
					localStorage
						.getItem("following")
						?.includes(jsonData[0].user_id)
				) {
					setIsFollowed(true);
					console.log("already following");
				}
				setUsername(jsonData[0].username);
				setPfp(jsonData[0].pfp);
				setEmail(jsonData[0].email);
				setFollowing(jsonData[0].following);
				setFollowers(jsonData[0].followers);
				let k = 0;
				jsonData.forEach((d: any, i: number) => {
					k += d.points;
				});
				setKarma(k);
				getFollowing(jsonData[0].following)
			} catch (error) {
				console.log(error);
			}
		}
		getBlogs();
	}, []);
	// when the follow button is pressed
	async function follow() {
		setIsFollowed(true);
		setFollowers(followers + 1)
		const signedUid = localStorage.getItem("count");
		const followedUid = data[0].user_id;
		if (signedUid == followedUid) {
			alert("You can't follow yourself");
			return;
		}
		if (!signedUid) {
			alert("You have to sign in first");
			return;
		}

		const getResponse = await fetch(`${serverDomain}users/${signedUid}`);
		const jsonData = await getResponse.json();
		console.log(getResponse);

		console.log(jsonData);

		console.log(jsonData[0].following);

		const following = JSON.parse(jsonData[0].following);
		console.log(following);
		following.push(followedUid);
		console.log(following);
		localStorage.setItem("following", following);

		const response = await fetch(`${serverDomain}users/${signedUid}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(following),
		});
		const newFollower = await fetch(
			`${serverDomain}follower/${followedUid}`,
			{
				method: "PUT",
			}
		);
	}
	function getFollowing(fol: any) {
		console.log(fol);

		if (followingList.length) return

		JSON.parse(fol).forEach(async (f: Number) => {
			// console.log(f)
			// console.log(`${serverDomain}users/${f}`);
			const newJsonData = await fetch(`${serverDomain}users/${f}`)
			const newData = await newJsonData.json();

			const newListUsername: string = newData[0].username;
			followingList.push(newListUsername)
			setFollowingList(followingList)
		});
		setFollowingList(followingList)
		console.log(followingList)
	}

	return (
		<div>
			<Nav />
			<Meta title="Swipechoose" />
			<div className="content">
				<p>{!data && "loading, something something our fault"}</p>
				<div className="followingPeople">
					<h1>Followers:</h1>
					<div className="followingList">
						{/* fix this asap */}
						<div onClick={() => window.location.href = `/user/${JSON.parse(data[0].following)[0]}`} className="listUser">
							<Image width={50} height={50} src="" alt="pfp" />
							<h1>{followingList[0]}</h1>
						</div>
						<a className="seeMore">See more</a>
					</div>
				</div>
				<div className="userInfo">
					<img className="pfp" src={pfp} alt="" />
					<div className="bigUsername">
						<h1>{username}</h1>
						<i>{email}</i>
						<p className="">Karma: {karma}</p>
						<p className="">Followers: {followers}</p>
						<p>
							Follows&nbsp;
							{following && JSON.parse(following).length}
							&nbsp;
							{following && JSON.parse(following).length == 1
								? "person"
								: "people"}
						</p>
					</div>
					<div className="follows">
						<button
							disabled={isFollowed ? true : false}
							onClick={follow}
							className={isMine ? "no" : "follow"}
						>
							{isFollowed ? "followed" : "follow"}
						</button>
					</div>
				</div>
				<h1>{isNoPosts ? "This user has no posts yet" : ""}</h1>
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
