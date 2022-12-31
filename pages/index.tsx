import { useEffect, useState } from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";

export default function Home() {
	const [index, setIndex] = useState(0);
	const [imgSrc0, setImgSrc0] = useState(
		"https://source.unsplash.com/random/200x200?sig=0"
	);
	const [imgSrc1, setImgSrc1] = useState(
		"https://source.unsplash.com/random/200x200?sig=1"
	);
	function pick(imgNumber: boolean) {
		setIndex(index + 1);
		console.log("pick");
		!imgNumber
			? setImgSrc0(
					`https://source.unsplash.com/random/800x800?sig=${index}`
			  )
			: setImgSrc1(
					`https://source.unsplash.com/random/800x800?sig=${index}`
			  );
	}

	useEffect(() => {
		if (!localStorage.getItem("uid")) {
			window.location.href = "signin";
		}
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
				src={`https://source.unsplash.com/random/800x800?sig=${
					index + 1
				}`}
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
