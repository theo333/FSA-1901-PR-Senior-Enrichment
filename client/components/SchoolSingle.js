import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
(';');
import { Link } from 'react-router-dom';

const SchoolSingle = ({ school, schoolStudents }) => {
	// console.log('school: ', schoolStudents);	}
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
							const { firstName, lastName, id } = student;
							return (
								<li key={student.id} className=''>
									<Link to={`/students/${id}`}>
										{firstName} {lastName}
									</Link>
								</li>
							);
					  })
					: 'There are no students currently enrolled. Enroll now or we will be out of business soon!'}
			</ul>
			{/* TODO - change to button */}
			<Link to={`/schools/update/${school ? school.id : ''}`}>Edit School</Link>
		</div>
	);
};

const mapStateToProps = (state, { match }) => {
	const schoolId = Number(match.params.id);
	return {
		schoolStudents: state.students.filter(student => {
			return student.schoolId === schoolId;
		}),
		school: state.schools.find(school => school.id === schoolId)
	};
};

SchoolSingle.propTypes = {
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

export default connect(mapStateToProps)(SchoolSingle);
