import React, { useState } from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";
import { ref, getStorage, uploadBytes } from "../components/firebase";

const serverDomain =
	"http://localhost:4000/" || "https://swipechoose.onrender.com/";

function Novy() {
	const [title, setTitle] = useState("");
	const [img, setImg] = useState<any>();
	const [error, setError] = useState("");

	function submit(e: any) {
		e.preventDefault();
		console.log("submit");
		if (!title && !img) {
			setError("Email and password are mandatory");
			return;
		}
		const spaceRef = ref(storage, `imgs/${title}.png`);
		uploadBytes(spaceRef, img).then(async (snapshot) => {
			try {
				const Rid = localStorage.getItem("uid");
				const Rtitle = { title };
				const Rimg = { img };

				const arr = [Rid, Rtitle, Rimg];
				console.log(arr);

				const response = await fetch(`${serverDomain}posts`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(arr),
				});
				console.log("posted");

				window.location.reload();
			} catch (error) {
				console.log(error);
			}
		});
	}
	return (
		<div className="content">
			<Nav />
			<Meta title="Swipechoose" />
			<h1>Post a new image</h1>
			<form onSubmit={submit} className="newImgForm" action="">
				<label htmlFor="title">Picture title</label>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					id="title"
					placeholder="A cool picture"
				/>

				<label htmlFor="pic">Picture source:</label>
				<input
					accept="img/*"
					onChange={(e) => setImg(e)}
					id="pic"
					type="file"
				/>
				<button type="submit">post</button>
			</form>
		</div>
	);
}

export default Novy;
