import React from "react";
import Head from "next/head";

function Meta({ title, keywords, description }) {
	return (
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta content="https://swipechoose.netlify.app" property="og:url" />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<meta property="og:type" content="website" />
			<meta
				content="Swipe to rate posts!"
				property="og:description"
			/>{" "}
			<meta
				content="#d75f09"
				data-react-helmet="true"
				name="theme-color"
			/>
			<title>{title}</title>
			{/* twitter */}
			<meta name="twitter:title" content="Swipe to rate posts!" />
			<meta
				name="twitter:description"
				content="A site all about swiping and choosing."
			/>
			<meta name="twitter:creator" content="@divear0" />
			<meta name="twitter:domain" content="https://swipechoose.netlify.app/" />
		</Head>
	);
}

Meta.defaultProps = {
	title: "Swipechoose",
	keywords:
		"swipechoose, schoose, odehnal, zpravy, messages, divear, post, hello, swipe, choose, chose, chse, svipe ",
	description: "Swipechoose, the site for rating the best.",
};

export default Meta;
