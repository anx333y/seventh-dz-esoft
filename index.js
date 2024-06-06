const express = require('express');

const app = express();
const mainRouter = require('./router');

app.use(express.json());
app.use(mainRouter);


app.listen(3000, 'localhost', () => {
	console.log('started on link http://localhost:3000')
})