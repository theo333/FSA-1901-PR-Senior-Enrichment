import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StudentSingle = props => {
	const { school, student } = props;
	const { id, firstName, lastName, imageUrl, email, gpa } = student;
	return (
		<div>
			<h1>
				{firstName} {lastName}
			</h1>
			<img src={imageUrl} className='student-img' />
			<ul className='list-group'>
				<li className='list-group-item'>Email: {email}</li>
				<li className='list-group-item'>GPA: {gpa}</li>
				<li className='list-group-item'>
					Campus:{' '}
					{school ? (
						<Link to={`/schools/${school.id}`}>{school.name}</Link>
					) : (
						'Not signed up yet'
					)}
				</li>
				<Link to={`/students/update/${id}`}>Edit Profile</Link>
			</ul>
		</div>
	);
};

const mapStateToProps = (state, { match }) => {
	let student = {};
	let school = {};
	if (state.students.length) {
		student = state.students.find(
			student => student.id === Number(match.params.id)
		);
	}
	if (state.schools.length) {
		school = state.schools.find(school => {
			return school.id === student.schoolId;
		});
	}
	return {
		student: student,
		school
	};
};

StudentSingle.propTypes = {
	student: PropTypes.shape({
		name: PropTypes.string,
		imageUrl: PropTypes.string,
		gpa: PropTypes.number,
		email: PropTypes.string
	}),
	school: PropTypes.shape({
		name: PropTypes.string
	})
};

export default connect(mapStateToProps)(StudentSingle);
