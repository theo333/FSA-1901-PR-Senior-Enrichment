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

app.get('/style.css', (req, res, next) =>
	res.sendFile(path.join(__dirname, '../client', 'style.css'))
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

app.get('/api/students/:id', (req, res, next) => {
	Student.findByPk(req.params.id)
		.then(student => res.json(student))
		.catch(next);
});

app.get('/api/schools/:id', (req, res, next) => {
	School.findByPk(req.params.id)
		.then(school => res.json(school))
		.catch(next);
});

app.post('/api/schools/create', (req, res, next) => {
	School.create(req.body)
		.then(school => res.send(school))
		.catch(next);
});

app.post('/api/students/create', (req, res, next) => {
	Student.create(req.body)
		.then(student => res.send(student))
		.catch(next);
});

app.delete('/api/schools/delete/:id', (req, res, next) => {
	School.findByPk(req.params.id)
		.then(school => school.destroy())
		.then(() => res.sendStatus(204))
		.catch(next);
});

app.delete('/api/students/delete/:id', (req, res, next) => {
	Student.findByPk(req.params.id)
		.then(student => student.destroy())
		.then(() => res.sendStatus(204))
		.catch(next);
});

// general error handling
// TODO
app.use((err, req, res, next) => {
	// console.error('backend err msg: ', JSON.stringify(err, null, 3));
	const errors = err.errors.map(error => error.message);
	err.status = errors.length ? '400' : '';
	// console.log('err.status: ', err.status);
	res.status(errors.length ? '400' : '500').send({ errors });
});

syncAndSeed();

app.listen(port, () => console.log(`listening on port ${port}`));
