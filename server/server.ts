const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const app = express();
const cors = require("cors");

const db = mysql.createPool({
	host: "bclzwse0qhodqhmzbbub-mysql.services.clever-cloud.com",
	user: "uf6oxcgju3bnpx5b",
	password: process.env.PASSWORD,
	database: "bclzwse0qhodqhmzbbub",
	charset: "utf8mb4",
	multipleStatements: true,
});

//middleware
app.use(cors());
app.use(express.json());

//get all posts
app.get("/posts", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	const sql = `
		SELECT
		posts.id,
		posts.datum,
		posts.title,
		posts.photo_url,
		users.user_id AS user_id,
		users.username AS username,
		users.pfp AS pfp,
		users.email AS email
		FROM posts 
		LEFT JOIN users ON posts.user_id = users.user_id
		`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

//get one post
app.get("/posts/:id", (req, res) => {
	console.log(req.params.id);

	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	const sql = `

		SELECT
		posts.id,
		posts.datum,
		posts.title,
		posts.photo_url,
		users.user_id AS user_id,
		users.username AS username,
		users.pfp AS pfp,
		users.email AS email
		FROM posts 
		LEFT JOIN users ON posts.user_id = users.user_id
		WHERE id = ?;
		`;
	db.query(sql, [req.params.id], (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

//add a user - sign up
app.post("/users", async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	const post = req.body;
	console.log(post);

	const sql = `
		INSERT INTO users(email, username, pfp, following) VALUES( ?, ?, ?, ?);
	`;
	db.query(sql, [post[0], post[1], post[2], post[3]], (err, result) => {
		if (err) res.send(err);
		res.send(result);
	});
});

//get number of users
app.get("/users-number", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	const sql = `
		SELECT
		COUNT(*) AS id
		FROM users;`;
	db.query(sql, (err, result) => {
		if (err) throw err.message;
		res.send(result);
		console.log("users number");
	});
});

//create a post
app.post("/posts", async (req, res) => {
	try {
		console.log("post");

		const reqe = req.body;

		const sql = `INSERT INTO posts(datum, user_id, title, photo_url) VALUES(now(), ?, ?, ?);`;

		console.log(reqe);
		console.log(reqe[2].link);

		db.query(
			sql,
			[reqe[0].id + 1, reqe[2].link, reqe[3].url],
			(err, result) => {
				if (err) throw err.message;
				res.send(result);
			}
		);
	} catch (error) {
		console.log(error);
	}
});

app.delete("/posts/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletePost = await db.query("DELETE FROM posts WHERE id = ?", [
			id,
		]);
		res.json("Post was deleted!");
	} catch (error) {
		console.log(error);
	}
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
