CREATE TABLE users(
    user_id INT AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(500),
    friends VARCHAR(2000),
    pfp VARCHAR(1000),
    PRIMARY KEY(user_id)
);

INSERT INTO users(username, email, friends, pfp) VALUES('drahomíra' , 'draha@gmail.com', "[1,2]", "https://thiscatdoesnotexist.com/");

USE bclzwse0qhodqhmzbbub

INSERT INTO posts(datum, title, photo_url, user_id) VALUES (now(), "cool photo", "https://firebasestorage.googleapis.com/v0/b/picture-database.appspot.com/o/imgs%2Ff4eb4ddd-07e9-46fb-b8cb-3ce6f01d3c18?alt=media", 2);

CREATE TABLE posts(
    id INT AUTO_INCREMENT,
    datum VARCHAR(1000),
    title VARCHAR(200),
    photo_url VARCHAR(1000),
    user_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);