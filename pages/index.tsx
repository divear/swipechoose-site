import { useEffect, useState } from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";
const serverDomain =
	"http://localhost:4000/" || "https://swipechoose.onrender.com/";

export default function Home() {
	const [data, setData] = useState<any>();
	const [index, setIndex] = useState(0);
	const [imgSrc0, setImgSrc0] = useState(
		"https://source.unsplash.com/random/200x200?sig=0"
	);
	const [imgSrc1, setImgSrc1] = useState(
		"https://source.unsplash.com/random/200x200?sig=1"
	);
	function pick(imgNumber: boolean) {
		setIndex(index + 1);
		!imgNumber
			? setImgSrc0(
					`https://source.unsplash.com/random/800x800?sig=${index}`
			  )
			: setImgSrc1(
					`https://source.unsplash.com/random/800x800?sig=${index}`
			  );
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
		console.log(data);
		console.log(data[0].photo_url);
	}, []);

	return (
		<div className="content">
			<Nav />
			<Meta title="Swipechoose" />
			<div className="pics">
				<img
					onClick={() => pick(false)}
					className="pickImage leftImage"
					src={imgSrc0}
					alt="pic0"
				/>
				<img
					onClick={() => pick(true)}
					className="pickImage rightImage"
					src={imgSrc1}
					alt="pic1"
				/>
			</div>
			<img
				className="no"
				src={data[0] && data[index + 1].photo_url}
				alt=""
			/>
			<img
				className="no"
				src={`https://source.unsplash.com/random/800x800?sig=${
					index + 2
				}`}
				alt=""
			/>
		</div>
	);
}
