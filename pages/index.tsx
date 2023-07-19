import { useEffect, useState } from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";
import Image from "next/image";
import point from "../public/point.png";

var serverDomain: string;

export default function Home() {
	const [data, setData] = useState<any>();
	const [index, setIndex] = useState(0);
	const [searchNames, setSearchNames] = useState([]);
	const [nameHovered, setNameHovered] = useState(0);
	const [isEnd, setIsEnd] = useState(false);
	const [loadProgress, setLoadProgress] = useState(0);

	useEffect(() => {
		if (window.location.hostname != "localhost") {
			serverDomain = "https://swipechoose.onrender.com/";
		} else {
			serverDomain = "http://localhost:4000/";
		}
		async function getBlogs() {
			try {
				const response = await fetch(`${serverDomain}posts`);
				const jsonData = await response.json();
				console.log(jsonData);

				//check if the user wants the welcome posts
				if (localStorage.getItem("wantsWelcome") === "false") {
					setData(
						jsonData
							.filter(
								(d: any) =>
									d.title != "Hi, I'm new to Swipechoose!"
							)
							.reverse()
					);
					return;
				}
				setData(jsonData.reverse());
			} catch (error) {
				console.log(error);
			}
		}
		getBlogs();

		function move(e: any) {
			if (!searchNames[0]) {
				return;
			}
			console.log(e.key);

			if (e.key === "ArrowDown" && nameHovered < searchNames.length) {
				setNameHovered(nameHovered + 1);
			} else if (e.key === "ArrowUp" && nameHovered > 0) {
				setNameHovered(nameHovered - 1);
			} else if (e.key === "Enter" || e.key === "Space") {
				const userId: any = searchNames[nameHovered];
				console.log(userId);
				visitUserPage(userId.user_id);
			}
			console.log(e.key, nameHovered);
		}
		window.document.addEventListener("keydown", (e) => move(e));
	}, []);
	function searchPeople(e: any) {
		const search = e.target.value;

		if (search.length < 2) return;

		const sdat = data.filter(
			(d: any) =>
				d.username.toLowerCase().slice(0, search.length) ===
				search.toLowerCase()
		);
		var sdata = removeDuplicatesBy((da: any) => da.email, sdat);
		setSearchNames(sdata);
	}

	function removeDuplicatesBy(keyFn: any, array: any) {
		var mySet = new Set();
		return array.filter(function (x: any) {
			var key = keyFn(x),
				isNew = !mySet.has(key);
			if (isNew) mySet.add(key);
			return isNew;
		});
	}
	function visitUserPage(id: number) {
		window.location.href = `user/${id}`;
	}

	//pick one posts
	async function pick(imgNumber: boolean, postId: number) {
		if (!data[index + 3] || !data[index + 4]) {
			setIsEnd(true);
			return;
		}

		setIndex(index + 2);
		const response = await fetch(`${serverDomain}posts/${postId}`, {
			method: "PUT",
		});
	}
	function clickUser(i: number) {
		window.location.href = `/user/${data[index + i - 1].user_id}`;
	}
	setInterval(function () {
		setLoadProgress(loadProgress + 0.5);
	}, 500);

	if (data) {
		return (
			<div className="content">
				<Nav />
				<Meta title="Swipechoose" />
				<input
					onChange={(e) => searchPeople(e)}
					className="searchbar"
					type="search"
					placeholder="Search for people"
				/>
				<div className={isEnd ? "endModal" : "no"}>
					<h1>u ran out of posts, buddy</h1>
				</div>
				<div className={searchNames[0] ? "searchedModal" : "no"}>
					{searchNames &&
						searchNames.map((d: any, i: number) => {
							return (
								<div
									key={i}
									id={`searchedName${i}`}
									className={
										nameHovered == i
											? "hoverSearchUsername"
											: "searchUsername"
									}
									onClick={() => visitUserPage(d.user_id)}
									onMouseEnter={() => setNameHovered(i)}
								>
									<Image
										width={100}
										height={100}
										src={d.pfp}
										alt="pfp"
										className="miniPfp"
									/>
									<h3>{d.username}</h3>
								</div>
							);
						})}
				</div>
				<button
					className="new"
					onClick={() => (window.location.href = "/novy")}
				>
					+
				</button>
				<div className="pics">
					{/* first */}
					<img
						onClick={() => pick(false, data[index].id)}
						className="pickImage leftImage"
						src={data[index].photo_url}
						alt="pic0"
					/>
					<div className="info info1">
						<div onClick={() => clickUser(1)} className="smallUser">
							<img src={data[index].pfp} alt="pfp" />
							<h1>{data[index].username}</h1>
						</div>
						<div className="likeCount likeCount1">
							<Image width={30} src={point} alt=" likes"></Image>
							{data[index].points}
						</div>
						<h1 className="postTitle">{data[index].title}</h1>
					</div>
					{/* new user info */}
					<p className={index == 0 ? "newUserInfo" : "newUserInfoNo"}>
						Click the image you like better to give it a point
					</p>{" "}
					{/* second */}
					<img
						onClick={() => pick(true, data[index + 1].id)}
						className="pickImage rightImage"
						src={data[index + 1].photo_url}
						alt="pic1"
					/>
					<div className="info info2">
						<div onClick={() => clickUser(2)} className="smallUser">
							<img src={data[index + 1].pfp} alt="pfp" />
							<h1>{data[index + 1].username}</h1>
						</div>
						<div className="likeCount likeCount2">
							<Image width={30} src={point} alt=" likes"></Image>
							{data[index + 1].points}
						</div>
						<h1 className="postTitle">{data[index + 1].title}</h1>
					</div>
				</div>
				<img className="no" src={data[index + 1].photo_url} alt="" />
			</div>
		);
	} else {
		return (
			<div className="loading">
				<h1>Loading...</h1>
				<div style={{ width: `${loadProgress}%` }} className="loadbar">
					‍‍
				</div>
			</div>
		);
	}
}
