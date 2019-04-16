const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false });
const { schoolSeed, studentSeed } = require('./seed');

const School = conn.define('school', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: true,
			notEmpty: {
				args: true,
				msg: 'Name must be provided.'
			}
		}
	},
	imageUrl: {
		type: Sequelize.TEXT,
		defaultValue:
			'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj_-YSB7M3hAhVKTd8KHWHcBAQQjRx6BAgBEAU&url=https%3A%2F%2Fthebestschools.org%2Ffeatures%2Fmost-amazing-college-campus-buildings%2F&psig=AOvVaw2RrFodp86G_JZK5SfLVVHe&ust=1555271510716014'
	},
	address: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: true,
			notEmpty: {
				args: true,
				msg: 'Address must be provided.'
			}
		}
	},
	description: {
		type: Sequelize.TEXT
	}
});

const Student = conn.define('student', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: true,
			notEmpty: true
		}
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: true,
			notEmpty: true
		}
	},
	email: {
		type: Sequelize.STRING
		// allowNull: false,
		// validate: {
		// 	isEmail: true,
		// 	notNull: true,
		// 	notEmpty: true
		// }
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue:
			'https://www.ldatschool.ca/wp-content/uploads/2015/03/Young-student.jpg'
	},
	gpa: {
		type: Sequelize.FLOAT,
		validate: {
			min: 0,
			max: 4
		}
		// need to create random gpa
	}
});

School.hasMany(Student);
Student.belongsTo(School);
// Student.belongsTo(School); // ??

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
			return Promise.all([
				Student.create({
					firstName: 'Joe',
					lastName: 'Smith',
					schoolId: school1.id,
					email: 'joesmith@gmail',
					imageUrl: 'https://www.nssi.com/media/wysiwyg/images/2.jpg',
					gpa: 3.0
				}),
				Student.create({
					firstName: 'Jill',
					lastName: 'Martin',
					schoolId: school1.id,
					email: 'jillmartin@gmail',
					imageUrl:
						'https://www.psychology.org.au/getmedia/8dfad19d-9e57-42ee-ba34-5b8f13462fb4/MB-Student-early-career-548x274.jpg',
					gpa: 3.8
				}),
				Student.create({
					firstName: 'Sarah',
					lastName: 'Silverstein',
					schoolId: school2.id,
					email: 'sarahsilverstein@gmail',
					imageUrl: 'https://www.caprent.com/img/student.jpg',
					gpa: 4.0
				}),
				Student.create({
					firstName: 'Rajit',
					lastName: 'Shah',
					schoolId: school3.id,
					imageUrl:
						'https://i.dailymail.co.uk/i/pix/2013/09/02/article-2408917-1B95C374000005DC-397_306x423.jpg',
					gpa: 3.6
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
