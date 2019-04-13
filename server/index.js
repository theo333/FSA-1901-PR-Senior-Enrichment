const express = require('express');
const app = express();
const path = require('path');

const { Student, School, syncAndSeed } = require('./db');

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/app.js', (req, res, next) =>
	res.sendFile(path.join(__dirname, '../dist', 'main.js'))
);

app.get('/', (req, res, next) =>
	res.sendFile(path.join(__dirname, '../client', 'index.html'))
);

// api routes
app.get('/api/students', (req, res, next) => {
	Student.findAll()
		.then(students => res.json(students))
		.catch(next);
});

app.get('/api/schools', (req, res, next) => {
	School.findAll()
		.then(schools => res.json(schools))
		.catch(next);
});

syncAndSeed();

app.listen(port, () => console.log(`listening on port ${port}`));
