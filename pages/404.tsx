import React from "react";
import Meta from "../components/Meta";
import Link from "next/link";

function NotFound() {
	return (
		<div className="notFound">
			<Meta title={"Not Found"} />
			<h1>404 Not Found</h1>
			<Link href="/">Back to main page.</Link>
		</div>
	);
}

export default NotFound;
