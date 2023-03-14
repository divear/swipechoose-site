import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Meta from "../../components/Meta";
import Nav from "../../components/Nav";
const serverDomain =
	"http://localhost:4000/" || "https://swipechoose.onrender.com/";
function UserPage() {
	const { query } = useRouter();
	const id = query.id;
	console.log(id);

	const [data, setData] = useState<any>();
	useEffect(() => {
		async function getBlogs() {
			try {
				const response = await fetch(`${serverDomain}users/${id}`);
				console.log(`${serverDomain}users/${id}`);

				const jsonData = await response.json();
				setData(jsonData);
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
	return (
		<div>
			<Nav />
			<Meta title="Swipechoose" />
			<div className="content">
				<h1>{data && data[0] && data[0].username}</h1>
				{/* <i>{data[0].email}</i> */}
				{/* {data &&
					data.map((d: any) => {
						return <div>hi</div>;
					})} */}
				{/* <img src={data[0].pfp} alt="" /> */}
			</div>
		</div>
	);
}

export default UserPage;
