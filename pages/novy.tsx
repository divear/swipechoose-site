import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";
import { ref, getStorage, uploadBytes } from "../components/firebase";

var serverDomain: string;
const storage = getStorage();

function Novy() {
	const [title, setTitle] = useState("");
	const [img, setImg] = useState<any>();
	const [error, setError] = useState("");
	const [imgLink, setImgLink] = useState("");
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (window.location.hostname != "localhost") {
			serverDomain = "https://swipechoose.onrender.com/";
		} else {
			serverDomain = "http://localhost:4000/";
		}
		if (!window) return;
		setCount(Number(localStorage.getItem("count")));
	}, []);

	function submit(e: any) {
		e.preventDefault();
		console.log("submit");

		if (!title && !img) {
			setError("Title and image are mandatory");
			return;
		}

		const spaceRef = ref(storage, `imgs/${img.name}`);
		uploadBytes(spaceRef, img).then(async (snapshot) => {
			try {
				console.log(img);
				console.log(snapshot);

				const Rid = { user_id: count };
				const Rtitle = { title };
				const Rimg = { imgLink };

				const arr = [Rid, Rtitle, Rimg];
				console.log(arr);

				const response = await fetch(`${serverDomain}posts`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(arr),
				});
				console.log("posted");

				window.location.href = "/";
			} catch (error) {
				console.log(error);
			}
		});
	}
	function changeFile(e: any) {
		setImg(e.target.files[0]);
		setImgLink(
			`https://firebasestorage.googleapis.com/v0/b/swipechoose-55985.appspot.com/o/imgs%2F${e.target.files[0].name}?alt=media`
		);
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
					onChange={(e) => changeFile(e)}
					accept="image/*"
					id="pic"
					type="file"
				/>
				<button id="sendImage" type="submit">
					post
				</button>
				<h1>{error}</h1>
			</form>
		</div>
	);
}

export default Novy;
