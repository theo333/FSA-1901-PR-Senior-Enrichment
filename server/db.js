const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false });

const School = conn.define('school', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: true,
			notEmpty: true
		}
	},
	imageUrl: {
		type: Sequelize.TEXT,
		defaultValue:
			'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj_-YSB7M3hAhVKTd8KHWHcBAQQjRx6BAgBEAU&url=https%3A%2F%2Fthebestschools.org%2Ffeatures%2Fmost-amazing-college-campus-buildings%2F&psig=AOvVaw2RrFodp86G_JZK5SfLVVHe&ust=1555271510716014'
	},
	address: {
		type: Sequelize.STRING
		// validate: {
		// 	allowNull: false,
		// 	notEmpty: true
		// }
	},
	description: {
		type: Sequelize.TEXT
	}
});

const Student = conn.define('student', {
	firstName: Sequelize.STRING,
	lastName: Sequelize.STRING
});

School.hasMany(Student);
Student.belongsTo(School);
// Student.belongsTo(School); // ??

const schoolSeed = [
	{
		name: 'NYU',
		imageUrl:
			'https://c8.alamy.com/comp/CXTXG6/new-york-city-ny-usa-students-walking-outside-at-new-york-university-CXTXG6.jpg',
		address: `60 Washington Square South, Suite 210
	New York, NY 10012`,
		description: `In 1831, Albert Gallatin, the distinguished statesman who served as secretary of the treasury under Presidents Thomas Jefferson and James Madison, declared his intention to establish "in this immense and fast-growing city ... a system of rational and practical education fitting for all and graciously opened to all."

	Founded in 1831, New York University is now one of the largest private universities in the United States. Of the more than 3,000 colleges and universities in America, New York University is one of only 60 member institutions of the distinguished Association of American Universities. From a student body of 158 during NYU's very first semester, enrollment has grown to more than 50,000 students at three degree-granting campuses in New York City, Abu Dhabi, and Shanghai, and at study away sites in Africa, Asia, Australia, Europe, North and South America. Today, students come from every state in the union and from 133 foreign countries. `
	},
	{
		name: 'Columbia',
		imageUrl:
			'https://files1.structurae.de/files/photos/1/20080618/dsc05188_shift.jpg',
		address: `213 Low Library, 535 W. 116th St. · New York, NY 10027`,
		description: `Columbia University is one of the world's most important centers of research and at the same time a distinctive and distinguished learning environment for undergraduates and graduate students in many scholarly and professional fields. The University recognizes the importance of its location in New York City and seeks to link its research and teaching to the vast resources of a great metropolis. It seeks to attract a diverse and international faculty and student body, to support research and teaching on global issues, and to create academic relationships with many countries and regions. It expects all areas of the University to advance knowledge and learning at the highest level and to convey the products of its efforts to the world.`
	},
	{
		name: 'Fordham',
		imageUrl: 'https://rossrambles.files.wordpress.com/2012/11/dsc01731.jpg',
		address: `113 West 60th Street
	New York, NY 10023`,
		description: `We’re a Jesuit, Catholic university. Our spirit comes from the nearly 500-year history of the Jesuits. It’s the spirit of full-hearted engagement—with profound ideas, with communities around the world, with injustice, with beauty, with the entirety of the human experience.`
	},
	{
		name: 'Rutgers',
		imageUrl:
			'https://admissions.rutgers.edu/sites/default/files/styles/bean-uuamap/public/media/Images/Non-Home%20Hero/UUA-Home_NB.jpg?itok=QArb665r',
		address: `17 New Brunswick Ave, New Brunswick, NJ 08234`,
		description: `Academic and research powerhouse. Stellar faculty. Engaged students. Devotion to community. Whether organizing local food drives, volunteering at health clinics abroad, or researching the causes of autism, Rutgers–New Brunswick provides real-world experiences to prepare you for life. Get ready for an unparalleled adventure!`
	}
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
