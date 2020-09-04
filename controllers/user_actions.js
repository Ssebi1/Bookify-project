const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.edit = (req, res) => {
    var id = req.query.id;

    let { username, password } = req.body;

    db.query(
        'SELECT * FROM users WHERE user_id = ?',
        [id],
        async (error, result) => {
            let hashedPassword;
            if (error) throw error;
            if (!password || password.length < 4) {
                hashedPassword = result[0].user_password;
            } else hashedPassword = await bcrypt.hash(password, 8);
            if (!username || username.length < 4) username = result[0].username;

            db.query(
                'UPDATE users SET username = ?, user_password = ? WHERE user_id = ?',
                [username, hashedPassword, id],
                (error, result) => {
                    if (error) throw error;
                    db.query(
                        'SELECT * FROM users WHERE user_id = ?',
                        [id],
                        (error, result) => {
                            res.render('profile', {
                                user: result[0],
                            });
                        }
                    );
                }
            );
        }
    );
};
