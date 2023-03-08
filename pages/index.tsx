import { useEffect, useState } from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";
const serverDomain =
	"http://localhost:4000/" || "https://swipechoose.onrender.com/";

export default function Home() {
	const [data, setData] = useState<any>();
	const [index, setIndex] = useState(0);

	function pick(imgNumber: boolean) {
		setIndex(index + 2);
	}
	useEffect(() => {
		async function getBlogs() {
			try {
				const response = await fetch(`${serverDomain}posts`);
				const jsonData = await response.json();
				setData(jsonData.reverse());
				console.log(jsonData);
			} catch (error) {
				console.log(error);
			}
		}
		getBlogs();
		if (!localStorage.getItem("uid")) {
			window.location.href = "signin";
		}
	}, []);

	if (data) {
		return (
			<div className="content">
				<Nav />
				<Meta title="Swipechoose" />
				<button
					className="new"
					onClick={() => (window.location.href = "/novy")}
				>
					Post new
				</button>
				<div className="pics">
					<div className="smallUser">
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
					<div className="smallUser1">
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
