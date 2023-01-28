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
		posts.body, 
		posts.video_id,
		DATE_FORMAT(posts.datum, '%d/%m/%Y %H:%i') AS posted_date,
		users.user_id AS user_id,
		users.username AS username,
		users.pfp AS pfp,
		users.email AS email
		FROM posts 
		LEFT JOIN users ON posts.user_id = users.user_id
		WHERE posts.id = ?
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
	//hash
	const post = req.body;

	let password = post[2].password;

	//const salt = await bcrypt.genSalt();

	const sql = `
		INSERT INTO users(email, username, user_password) VALUES( ?, ?, ?);
	`;
	db.query(
		sql,
		[post[0].email, post[1].username, password],
		(err, result) => {
			if (err) res.send(err);
			res.send(result);
		}
	);
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

		const sql = `INSERT INTO posts(body, datum, user_id, video_id) VALUES(?, now(), ?, ?);`;

		console.log(reqe);
		console.log(reqe[2].link);

		db.query(
			sql,
			[reqe[1].body, reqe[0].id + 1, reqe[2].link],
			(err, result) => {
				if (err) throw err.message;
				res.send(result);
			}
		);
	} catch (error) {
		console.log(error);
	}
});

//update a user

app.put("/users/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const respo = req.body;
		console.log([respo[0].username, respo[1].imgLink, id]);

		const updateTodo = await db.query(
			`UPDATE users SET username = ?, pfp = ? WHERE user_id = ?`,
			[respo[0].username, respo[1].imgLink, id]
		);

		res.json("user was updated");
	} catch (error) {
		console.log(error);
	}
});

//check if login is correct
app.post("/users-login/:email", async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);

	const reqe = req.body;

	const email = req.params.email;

	let password = reqe[0].password;

	const sql = `
		SELECT * FROM users
		WHERE email = ?
	`;
	db.query(sql, [email], async (err, result) => {
		if (err) throw err;
		console.log(result);
		if (!result.lenght) {
			res.send(["wrong email"]);
			return;
		}

		const user_password = result[0].user_password;
		console.log([user_password, password]);

		if (user_password === password) {
			res.send(result);
			console.log("users login");
			return;
		}
		console.log("login failed");
		res.send([]);
	});
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
