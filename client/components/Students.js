import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteStudent } from '../store';

const Students = ({ students, deleteStudent }) => {
	return (
		<div>
			<div className='d-flex justify-content-end'>
				<Link to='/students/create'>
					<i className='fas fa-plus plus-add-item' />
				</Link>
			</div>
			<ul className='list-group'>
				{students.map(student => {
					const { id, firstName, lastName } = student;
					return (
						<li key={id} className='list-group-item'>
							<Link to={`/students/${id}`}>
								{firstName} {lastName}
							</Link>
							<button onClick={() => deleteStudent(id)}>
								<i className='far fa-trash-alt' />
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		students: state.students
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
