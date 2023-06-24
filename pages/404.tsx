import React from "react";
import Meta from "../components/Meta";

function NotFound() {
	return (
		<div className="notFound">
			<Meta title={"Not Found"} />
			<h1>404 Not Found</h1>
			<a href="/">Back to main page.</a>
		</div>
	);
}

export default NotFound;
