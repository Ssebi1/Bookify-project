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
    database: process.env.DATABASE,
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
            'SELECT * FROM books WHERE user_id = ?',
            [req.cookies.user_id],
            (error, result) => {
                if (error) throw error;
                res.render('dashboard.ejs', {
                    length: result.length,
                    result,
                });
            }
        );
    } else res.render('index.ejs');
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
    if (req.cookies.username) res.render('add_book.ejs');
    else res.redirect('/');
});

app.use('/auth', require('./routes/auth.js'));
app.use('/dashboard/crud', require('./routes/crud.js'));
