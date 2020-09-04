//Server setup
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

//Env setup
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

//Database connect
const mysql = require('mysql');
const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});

db.connect((err) => {
	if (err) throw err;
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//EJS setup
const ejs = require('ejs');
app.set('view engine', 'ejs');

//Connect to the server on port 8080 by default
app.listen(port, (error) => {
	if (error) throw error;
});

//Root css file
app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', (req, res) => {
	if (req.cookies.user_id) {
		db.query(
			'SELECT * FROM books WHERE user_id = ? ORDER BY book_id DESC',
			[ req.cookies.user_id ],
			(error, result) => {
				if (error) throw error;
				res.render('dashboard.ejs', {
					length: result.length,
					result,
					username: req.cookies.username
				});
			}
		);
	}
	else res.render('index.ejs');
});

app.get('/login', (req, res) => {
	if (!req.cookies.username) res.render('login.ejs');
	else res.redirect('/');
});

app.get('/register', (req, res) => {
	if (!req.cookies.username) res.render('register.ejs');
	else res.redirect('/');
});

app.get('/dashboard', (req, res) => {
	res.redirect('/');
});

app.get('/dashboard/add_book', (req, res) => {
	if (req.cookies.username) res.render('add_book.ejs', { username: req.cookies.username });
	else res.redirect('/');
});

app.get('/book', (req, res) => {
	var id = req.query.id;

	db.query('SELECT user_id FROM books WHERE book_id = ?', [ id ], (error, result) => {
		if (error) throw error;
		if (result[0].user_id == req.cookies.user_id) {
			db.query('SELECT * FROM books WHERE book_id = ?', [ id ], (error, result) => {
				if (error) throw error;
				res.render('book', {
					book: result[0],
					username: req.cookies.username
				});
			});
		}
		else res.status(401).redirect('/');
	});
});

app.get('/edit_book', (req, res) => {
	var id = req.query.id;

	db.query('SELECT * FROM books WHERE book_id = ?', [ id ], (error, result) => {
		if (error) throw error;
		res.render('edit_book', {
			book: result[0],
			username: req.cookies.username
		});
	});
});

app.get('/profile', (req, res) => {
	if (req.cookies.username) {
		db.query('SELECT * FROM users WHERE user_id = ?', [ req.cookies.user_id ], (error, result) => {
			if (error) throw error;
			res.render('profile', {
				user: result[0],
				username: req.cookies.username
			});
		});
	}
	else res.status(401).redirect('/');
});

app.post('/book/search', (req, res) => {
	var books = require('google-books-search');
	const { book_search } = req.body;

	books.search(book_search, (error, result) => {
		res.render('add_book', {
			result: result,
			username: req.cookies.username
		});
	});
});

app.get('/dashboard/add_book_search', (req, res) => {
	var title = req.query.title;
	var author = req.query.author;
	var link = req.link;
	res.render('add_book', {
		book: {
			title,
			author,
			link,
			description
		}
	});
});

app.use('/book/action', require('./routes/book_actions.js'));
app.use('/user/action', require('./routes/user_actions.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/dashboard/crud', require('./routes/crud.js'));
