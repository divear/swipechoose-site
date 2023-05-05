import { useEffect, useState } from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";
import Image from "next/image";

var serverDomain: any;

export default function Home() {
	const [data, setData] = useState<any>();
	const [index, setIndex] = useState(0);
	const [searchNames, setSearchNames] = useState([]);
	const [nameHovered, setNameHovered] = useState(0);

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

				setData(jsonData.reverse());
			} catch (error) {
				console.log(error);
			}
		}
		getBlogs();
		if (!localStorage.getItem("uid")) {
			window.location.href = "signin";
		}

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
		console.log("change", postId);
		console.log(`${serverDomain}posts/${postId}`);

		setIndex(index + 2);
		const response = await fetch(`${serverDomain}posts/${postId}`, {
			method: "PUT",
		});
	}
	function clickUser(i: number) {
		window.location.href = `/user/${data[index + i].user_id}`;
	}

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
					Post new
				</button>
				<div className="pics">
					{/* first */}
					<div
						onClick={() => clickUser(1)}
						className="smallUser smallUser0"
					>
						<img src={data[index + 1].pfp} alt="pfp" />
						<h1>{data[index + 1].username}</h1>
					</div>
					<img
						onClick={() => pick(false, data[index + 1].id)}
						className="pickImage leftImage"
						src={data[index + 1].photo_url}
						alt="pic0"
					/>
					<h1 className="imgTitle imgTitle0">
						{data[index + 1].title}
					</h1>
					<h1 className="likeCount likeCount1">{`${
						data[index + 1].points
					} points`}</h1>

					{/* second */}
					<div
						onClick={() => clickUser(2)}
						className="smallUser smallUser1"
					>
						<img src={data[index + 2].pfp} alt="pfp" />
						<h1>{data[index + 2].username}</h1>
					</div>
					<img
						onClick={() => pick(true, data[index + 2].id)}
						className="pickImage rightImage"
						src={data[index + 2].photo_url}
						alt="pic1"
					/>
					<h1 className="imgTitle imgTitle1">
						{data[index + 2].title}
					</h1>
					<h1 className="likeCount likeCount2">{`${
						data[index + 1].points
					} points`}</h1>
				</div>
				<img className="no" src={data[index + 2].photo_url} alt="" />
			</div>
		);
	} else {
		return <h1>Loading...</h1>;
	}
}
