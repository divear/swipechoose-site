import { useEffect, useState } from "react";
import { render } from "react-dom";
import Meta from "../components/Meta";
import Nav from "../components/Nav";
const serverDomain =
	"http://localhost:4000/" || "https://swipechoose.onrender.com/";

export default function Home() {
	const [data, setData] = useState<any>();
	const [index, setIndex] = useState(0);
	const [index1, setIndex1] = useState(0);
	const [imgSrc1, setImgSrc1] = useState(
		"https://source.unsplash.com/random/200x200?sig=1"
	);
	function pick(imgNumber: boolean) {
		imgNumber ? setIndex(index + 1) : setIndex1(index1 + 1);
		setImgSrc1(`https://source.unsplash.com/random/800x800?sig=${index}`);
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
		console.log(data[0].photo_url);
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
					<img
						onClick={() => pick(false)}
						className="pickImage leftImage"
						src={data[index + 1].photo_url}
						alt="pic0"
					/>
					<img
						onClick={() => pick(true)}
						className="pickImage rightImage"
						src={data[index1 + 1].photo_url}
						alt="pic1"
					/>
				</div>
				<img className="no" src={data[index + 2].photo_url} alt="" />
			</div>
		);
	} else {
		return <h1>Loading...</h1>;
	}
}
