import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const School = ({ school, schoolStudents }) => {
	// console.log('school: ', schoolStudents);
	return (
		<div>
			<h1>{school ? school.name : ''}</h1>
			<img src={school ? school.imageUrl : ''} className='school-img-lg' />
			<p>{school ? school.address : ''}</p>
			<p>{school ? school.description : ''} </p>
			<h3>Students</h3>
			<ul className=''>
				{schoolStudents.length
					? schoolStudents.map(student => {
							const { firstName, lastName } = student;
							return (
								<li key={student.id} className=''>
									{firstName} {lastName}
								</li>
							);
					  })
					: 'There are no students currently enrolled. Enroll now or we will be out of business soon!'}
			</ul>
		</div>
	);
};

const mapStateToProps = (state, { match }) => {
	const schoolId = match.params.id;
	return {
		schoolStudents: state.students.filter(student => {
			return student.schoolId === Number(match.params.id);
		}),
		school: state.schools.find(school => school.id === Number(match.params.id))
	};
};

School.propTypes = {
	school: PropTypes.shape({
		name: PropTypes.string,
		imageUrl: PropTypes.string,
		address: PropTypes.string,
		description: PropTypes.string
	}),
	schoolStudents: PropTypes.arrayOf(
		PropTypes.shape({
			firstName: PropTypes.string,
			lastName: PropTypes.string
		})
	)
};

export default connect(mapStateToProps)(School);
