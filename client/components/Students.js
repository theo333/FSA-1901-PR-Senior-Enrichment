import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({ students }) => {
	return (
		<div>
			<div className='d-flex justify-content-end'>
				{/* <div className='flex-row-reverse'> */}
				<Link to='/students/create'>
					<i className='fas fa-plus plus-add-item' />
				</Link>
				{/* </div> */}
			</div>
			<ul className='list-group'>
				{students.map(student => {
					const { id, firstName, lastName } = student;
					return (
						<li key={id} className='list-group-item'>
							<Link to={`/students/${id}`}>
								{firstName} {lastName}
							</Link>
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

export default connect(mapStateToProps)(Students);
