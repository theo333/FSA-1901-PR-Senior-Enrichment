import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteStudent } from '../store';

const StudentSingle = props => {
	const { school, student, deleteStudent } = props;
	const { id, firstName, lastName, imageUrl, email, gpa } = student;
	return (
		<div id='student-single-main' className='container d-flex'>
			<div className='d-flex flex-column align-items-center mr-auto ml-auto'>
				<h1>
					{firstName} {lastName}
				</h1>
				<img src={imageUrl} className='student-single-img' />
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
				</ul>
			</div>
			<div
				id='student-action-icons'
				className='d-flex flex-column align-items-start align-content-end'
			>
				<Link
					className='item-info'
					to={`/students/update/${student ? id : ''}`}
				>
					<i className='far fa-edit' />
				</Link>
				<Link
					to='/students'
					className='item-delete'
					onClick={() => deleteStudent(id)}
				>
					<i className='far fa-trash-alt' />
				</Link>
			</div>
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

const mapDispatchToProps = dispatch => {
	return {
		deleteStudent: id => dispatch(deleteStudent(id))
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentSingle);
