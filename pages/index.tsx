import { useEffect, useState } from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";
const serverDomain =
	"http://localhost:4000/" || "https://swipechoose.onrender.com/";

export default function Home() {
	const [data, setData] = useState<any>();
	const [index, setIndex] = useState(0);
	const [searchNames, setSearchNames] = useState([]);

	function pick(imgNumber: boolean) {
		setIndex(index + 2);
	}
	useEffect(() => {
		async function getBlogs() {
			try {
				const response = await fetch(`${serverDomain}posts`);
				const jsonData = await response.json();
				setData(jsonData.reverse());
			} catch (error) {
				console.log(error);
			}
		}
		getBlogs();
		if (!localStorage.getItem("uid")) {
			window.location.href = "signin";
		}
	}, []);
	function searchPeople(e: any) {
		console.log(e.target.value);
		const search = e.target.value;

		if (search.length < 2) return;
		console.log(data[0].username.slice(0, search.length));

		const sdat = data.filter(
			(d: any) => d.username.slice(0, search.length) === search
		);
		var sdata = removeDuplicatesBy((da: any) => da.username, sdat);
		setSearchNames(sdata);
		console.log(sdat);
	}
	function removeDuplicatesBy(keyFn: any, array: any) {
		var mySet = new Set();
		return array.filter(function (x) {
			var key = keyFn(x),
				isNew = !mySet.has(key);
			if (isNew) mySet.add(key);
			return isNew;
		});
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
								<div>
									<img
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
					<div
						onClick={() =>
							(window.location.href = `/user/${
								data[index + 1].user_id
							}`)
						}
						className="smallUser smallUser0"
					>
						<img src={data[index + 1].pfp} alt="pfp" />
						<h1>{data[index + 1].username}</h1>
					</div>
					<img
						onClick={() => pick(false)}
						className="pickImage leftImage"
						src={data[index + 1].photo_url}
						alt="pic0"
					/>
					<h1 className="imgTitle imgTitle0">
						{data[index + 1].title}
					</h1>

					{/* second */}
					<div
						onClick={() =>
							(window.location.href = `/user/${
								data[index + 2].user_id
							}`)
						}
						className="smallUser smallUser1"
					>
						<img src={data[index + 2].pfp} alt="pfp" />
						<h1>{data[index + 2].username}</h1>
					</div>
					<img
						onClick={() => pick(true)}
						className="pickImage rightImage"
						src={data[index + 2].photo_url}
						alt="pic1"
					/>
					<h1 className="imgTitle imgTitle1">
						{data[index + 2].title}
					</h1>
				</div>
				<img className="no" src={data[index + 2].photo_url} alt="" />
			</div>
		);
	} else {
		return <h1>Loading...</h1>;
	}
}
