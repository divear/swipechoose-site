import React from "react";
import Meta from "../components/Meta";
import Nav from "../components/Nav";

function Novy() {
	return (
		<div className="content">
			<Nav />
			<Meta title="Swipechoose" />
			<h1>post new </h1>
			<input type="file" />
			<button>post</button>
		</div>
	);
}

export default Novy;
