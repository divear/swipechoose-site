import React from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";

function Novy() {
	return (
		<div className="content">
			<Nav />
			<Meta title="Swipechoose" />
			<h1>Post a new image</h1>
			<form className="newImgForm" action="">
				<label htmlFor="title">Picture title</label>
				<input type="text" id="title" placeholder="A cool picture" />

				<label htmlFor="pic">Picture source:</label>
				<input id="pic" type="file" />
				<button type="submit">post</button>
			</form>
		</div>
	);
}

export default Novy;
