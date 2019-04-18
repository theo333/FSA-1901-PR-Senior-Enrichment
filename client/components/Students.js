import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteStudent } from '../store';

const Students = ({ students, schools, deleteStudent }) => {
	return (
		<div>
			<div className='plus-add-item d-flex justify-content-end align-items-center'>
				<Link to='/students/create' className='align-right'>
					<i className='fas fa-plus' /> Student
				</Link>
			</div>
			<ul className='list-group'>
				{students.map(student => {
					const { id, firstName, lastName, schoolId } = student;
					const school = schools.find(school => school.id === schoolId);
					return (
						// list-group-item
						<li
							key={id}
							className='list-group-item d-flex align-items-center justify-content-between p2 mb-3'
						>
							<Link to={`/students/${id}`} className=''>
								{firstName} {lastName}
							</Link>
							{school ? <span className=''>{school.name}</span> : ''}
							<div
								id='students-list-icons'
								className='d-flex align-items-start align-content-end'
							>
								<Link className='item-info' to={`/students/${id}`}>
									<i className='fas fa-info-circle' />
								</Link>
								<Link
									to='/students'
									className='item-delete'
									onClick={() => deleteStudent(id)}
								>
									<i className='far fa-trash-alt' />
								</Link>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		students: state.students,
		schools: state.schools
	};
};

const mapDispatchToProps = dispatch => {
	return {
		deleteStudent: id => dispatch(deleteStudent(id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Students);
