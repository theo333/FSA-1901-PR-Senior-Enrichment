import React from 'react';
import { connect } from 'react-redux';

const Students = ({ students }) => {
	// const { students } = props;
	return (
		<ul className='list-group'>
			{students.map(student => {
				const { id, firstName, lastName } = student;
				return (
					<li key={id} className='list-group-item'>
						{firstName} {lastName}
					</li>
				);
			})}
		</ul>
	);
};

const mapStateToProps = state => {
	return {
		students: state.students
	};
};

export default connect(mapStateToProps)(Students);