//Server setup
const express = require('express');
const app = express();
const port = 8080;

//Connect to the server on port 8080 by default
app.listen(port, (error) => {
	if (error) throw error;
});
