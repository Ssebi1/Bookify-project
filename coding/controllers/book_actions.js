const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.delete = (req, res) => {
    var id = req.query.id;
    db.query('DELETE FROM books WHERE book_id = ? ', [id], (error, result) => {
        if (error) throw error;
        res.redirect('/');
    });
};

exports.saveNotes = (req, res) => {
    const { notes } = req.body;
    var id = req.query.id;
    db.query(
        'UPDATE books SET book_notes = ? WHERE book_id = ?',
        [notes, id],
        (error, result) => {
            res.redirect('/book?id=' + id);
        }
    );
};