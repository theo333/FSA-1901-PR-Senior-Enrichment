const Sequelize = require('sequelize');
const conn = new Sequelize(
	process.env.DATABASE_URL
	// { logging: true }
);

const School = conn.define('school', {
	name: Sequelize.STRING
});

const Student = conn.define('student', {
	firstName: Sequelize.STRING,
	lastName: Sequelize.STRING
});

School.hasMany(Student);
Student.belongsTo(School);
// Student.belongsTo(School); // ??

const schoolSeed = [
	{ name: 'NYU' },
	{ name: 'Columbia' },
	{ name: 'Fordham' },
	{ name: 'Rutgers' }
];

const studentSeed = [
	{ firstName: 'Joe', lastName: 'Smith' },
	{ firstName: 'Jill', lastName: 'Martin' },
	{ firstName: 'Sarah', lastName: 'Silverstein' },
	{ firstName: 'Rajit', lastName: 'Shah' }
];

const syncAndSeed = () => {
	return conn
		.sync({ force: true })
		.then(() => {
			return Promise.all(
				schoolSeed.map(school => {
					return School.create(school);
				})
			);
		})
		.then(([school1, school2, school3, school4]) => {
			console.log(school2.id);
			return Promise.all([
				Student.create({
					firstName: 'Joe',
					lastName: 'Smith',
					schoolId: school1.id
				}),
				Student.create({
					firstName: 'Jill',
					lastName: 'Martin',
					schoolId: school1.id
				}),
				Student.create({
					firstName: 'Sarah',
					lastName: 'Silverstein',
					schoolId: school2.id
				}),
				Student.create({
					firstName: 'Rajit',
					lastName: 'Shah',
					schoolId: school3.id
				})
			]);
		})
		.catch(e => {
			throw e;
		});
};

module.exports = {
	syncAndSeed,
	School,
	Student
};
