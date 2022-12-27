import React from "react";
import Head from "next/head";

function Meta({ title, keywords, description }) {
	return (
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<title>{title}</title>
		</Head>
	);
}

Meta.defaultProps = {
	title: "Swipechoose",
	keywords:
		"test, site, programming, web, account, testing, zpravy, messages, divear, post, hello, swipe, choose, chose, chse, svipe ",
	description: "Swipechoose, the site for rating the best.",
};

export default Meta;
