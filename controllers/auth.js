const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.register = (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;
    if (!username || !email || !password || !passwordConfirm) {
        return res.render('register', {
            message: 'Fields should not be empty',
        });
    }
    db.query(
        'SELECT user_email FROM users WHERE user_email = ?',
        [email],
        async (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                return res.render('register', {
                    message: 'That email is already in use',
                });
            } else if (password !== passwordConfirm) {
                return res.render('register', {
                    message: 'Passwords do not match',
                });
            } else if (password.length < 4) {
                return res.render('register', {
                    message: 'Password has to be longer',
                });
            }

            let hashedPassword = await bcrypt.hash(password, 8);

            db.query(
                'INSERT INTO users SET ?',
                {
                    username: username,
                    user_email: email,
                    user_password: hashedPassword,
                },
                (error, result) => {
                    if (error) throw error;
                    else {
                        db.query(
                            'SELECT user_id FROM users WHERE user_email = ?',
                            [email],
                            (error, result) => {
                                if (error) throw error;
                                res.cookie('user_id', result[0].user_id);
                                res.cookie('username', username);
                                res.redirect('/');
                            }
                        );
                    }
                }
            );
        }
    );
};

exports.login = async (req, res) => {
    try {
        const { email, password, expire } = req.body;
        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Fields should not be empty',
            });
        }
        db.query(
            'SELECT * FROM users WHERE user_email = ?',
            [email],
            async (error, result) => {
                if (error) throw error;

                if (result.length == 0) {
                    return res.status(400).render('login', {
                        message: 'This email is not registered',
                    });
                }

                if (
                    !(await bcrypt.compare(password, result[0].user_password))
                ) {
                    return res.status(401).render('login', {
                        message: 'Email or password is incorrect',
                    });
                }

                if (expire) {
                    res.cookie('user_id', result[0].user_id, {
                        expires: new Date(
                            Date.now() + 1000 * 60 * 60 * 24 * 365
                        ),
                        httpOnly: true,
                    });
                    res.cookie('username', result[0].username, {
                        expires: new Date(
                            Date.now() + 1000 * 60 * 60 * 24 * 365
                        ),
                        httpOnly: true,
                    });
                } else {
                    res.cookie('user_id', result[0].user_id);
                    res.cookie('username', result[0].username);
                }

                res.redirect('/dashboard');
            }
        );
    } catch (error) {
        console.log(error);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('username');
    res.clearCookie('user_id');
    res.redirect('/');
};
