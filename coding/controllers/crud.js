const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.create = (req, res) => {
    var { title, author, category, link, progress } = req.body;

    if (!title || !author) {
        res.render('add_book', {
            message: 'Book title and author should not be empty',
        });
    } else {
        if (!category) category = 'general';
        db.query(
            'INSERT INTO books SET ?',
            {
                user_id: req.cookies.user_id,
                book_title: title,
                book_author: author,
                book_category: category,
                book_link: link,
                book_progress: progress,
            },
            (error, result) => {
                if (error) throw error;
                else {
                    res.redirect('/');
                }
            }
        );
    }
};