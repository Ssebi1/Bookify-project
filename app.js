//Server setup
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

//Env setup
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const bcrypt = require('bcryptjs');

//Database connect
const mysql = require('mysql');
const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//EJS setup
const ejs = require('ejs');
const { CLIENT_MULTI_RESULTS } = require('mysql/lib/protocol/constants/client');
app.set('view engine', 'ejs');

//Connect to the server on port 8080 by default
app.listen(port, (error) => {
    if (error) throw error;
});

//Root css file
app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', (req, res) => {
    res.redirect('/dashboard')
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
    var myBooks = req.query.mybooks;
    if(typeof myBooks == 'undefined') myBooks = false;

    if (myBooks) queryString = 'SELECT * FROM books WHERE user_id = ' + req.cookies.user_id +  ' ORDER BY book_id DESC'
    else queryString = 'SELECT * FROM books ORDER BY book_id DESC'

    if (myBooks) categoriesQueryString = 'SELECT DISTINCT book_category FROM books WHERE user_id = ' + req.cookies.user_id
    else categoriesQueryString = 'SELECT DISTINCT book_category FROM books'

    if (req.cookies.user_id) {
        db.query(
            queryString,
            (error, result) => {
                if (error) throw error;
                db.query(
                    categoriesQueryString,
                    (error2, result2) => {
                        if (error2) throw error;
                        booksPerCategoryCount = [];
                        for(var i=0; i<result2.length; i++) {
                            booksPerCategoryCount[result2[i].book_category] = 0;
                        }

                        for(var i=0; i<result.length; i++) {
                            booksPerCategoryCount[result[i].book_category]+=1;
                        }

                        res.render('dashboard.ejs', {
                            length: result.length,
                            result,
                            username: req.cookies.username,
                            user_type: req.cookies.user_type,
                            categories: result2 ,
                            booksPerCategoryCount: booksPerCategoryCount,
                            myBooks: myBooks
                        });
                    }
                );
            }
        );
    } else res.render('index.ejs');
});

app.get('/dashboard/add_book', (req, res) => {
    if (req.cookies.username)
        res.render('add_book.ejs', { username: req.cookies.username });
    else res.redirect('/');
});

app.get('/book', (req, res) => {
    var id = req.query.id;

    db.query(
        'SELECT * FROM books WHERE book_id = ?',
        [id],
        (error, result) => {
            if (error) throw error;

            res.render('book', {
                book: result[0],
                username: req.cookies.username,
                user_type: req.cookies.user_type,
                user_id: req.cookies.user_id
            });
        }
    );
});

app.get('/edit_book', (req, res) => {
    var id = req.query.id;

    db.query('SELECT * FROM books WHERE book_id = ?', [id], (error, result) => {
        if (error) throw error;
        res.render('edit_book', {
            book: result[0],
            username: req.cookies.username,
        });
    });
});

app.get('/profile', (req, res) => {
    if (req.cookies.username) {
        db.query(
            'SELECT * FROM users WHERE user_id = ?',
            [req.cookies.user_id],
            (error, result) => {
                if (error) throw error;
                res.render('profile', {
                    user: result[0],
                    username: req.cookies.username,
                });
            }
        );
    } else res.status(401).redirect('/');
});

app.post('/book/search', (req, res) => {
    var books = require('google-books-search');
    const { book_search } = req.body;

    books.search(book_search, (error, result) => {
        res.render('add_book', {
            result: result,
            username: req.cookies.username,
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
            description,
        },
    });
});

app.get('/dashboard/teachers', (req, res) => {
    if (req.cookies.user_type == "admin") {
        db.query(
            'SELECT * FROM users WHERE user_type = "teacher"',
            (error, result) => {
                if (error) throw error;
                res.render('teachers', {
                    username: req.cookies.username,
                    teachers: result
                });
            }
        );
    } else res.status(401).redirect('/');
});

app.get('/dashboard/teachers/add_teacher', (req, res) => {
    if (req.cookies.user_type == "admin") {
        res.render('add_teacher.ejs', {
            username: req.cookies.username
        })
    } else res.status(401).redirect('/');
});

app.post('/add_teacher', (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;
    if (!username || !email || !password || !passwordConfirm) {
        return res.render('add_teacher', {
            message: 'Fields should not be empty',
        });
    }
    db.query(
        'SELECT user_email FROM users WHERE user_email = ?',
        [email],
        async (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                return res.render('add_teacher', {
                    message: 'That email is already in use',
                    username: req.cookies.username
                });
            } else if (password !== passwordConfirm) {
                return res.render('add_teacher', {
                    message: 'Passwords do not match',
                    username: req.cookies.username
                });
            } else if (password.length < 4) {
                return res.render('add_teacher', {
                    message: 'Password has to be longer',
                    username: req.cookies.username
                });
            }

            let hashedPassword = await bcrypt.hash(password, 8);

            db.query(
                'INSERT INTO users SET ?',
                {
                    username: username,
                    user_email: email,
                    user_password: hashedPassword,
                    user_type: "teacher"
                },
                (error, result) => {
                    if (error) throw error;
                    else {
                        db.query(
                            'SELECT user_id FROM users WHERE user_email = ?',
                            [email],
                            (error, result) => {
                                if (error) throw error;
                                res.status(200).redirect('/dashboard/teachers')
                            }
                        );
                    }
                }
            );
        }
    );
})

app.get('/dashboard/teachers/delete', (req, res) => {
    var id = req.query.id;
    if(req.cookies.user_type == "admin") {
        db.query(
            'UPDATE users SET user_type="user" WHERE user_id = ?',
            [id],
            (error, result) => {
                if (error) throw error;
                res.redirect('/dashboard/teachers');
            }
        );
    } else res.status(401).redirect('/');
})

app.use('/book/action', require('./routes/book_actions.js'));
app.use('/user/action', require('./routes/user_actions.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/dashboard/crud', require('./routes/crud.js'));
