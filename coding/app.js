//Server setup
const express = require('express');
const app = express();
const port = 8080;

//EJS setup
const ejs = require('ejs');
app.set('view engine', ejs);

//Connect to the server on port 8080 by default
app.listen(port, (error) => {
	if (error) throw error;
});

//Root css file
app.use(express.static(__dirname + '/views'));

//Routes
app.get('/', (req, res) => {
	res.render('index.ejs');
});
