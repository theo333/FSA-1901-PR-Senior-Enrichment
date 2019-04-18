import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteSchool } from '../store';

class SchoolSingle extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { school, schoolStudents } = this.props;
		return (
			<div id='school-single-main' className='container d-flex'>
				<div className='d-flex flex-column align-items-center'>
					<h1>{school ? school.name : ''}</h1>
					<img
						src={school ? school.imageUrl : ''}
						className='school-single-img'
					/>
					<p>{school ? school.address : ''}</p>
					<p>{school ? school.description : ''} </p>
					<h2>Students</h2>
					<ul id='school-single-students'>
						{schoolStudents.length
							? schoolStudents.map(student => {
									const { firstName, lastName, id } = student;
									return (
										<li key={student.id} className='student-name'>
											<Link to={`/students/${id}`}>
												{firstName} {lastName}
											</Link>
										</li>
									);
							  })
							: 'There are no students currently enrolled. Enroll now or we will be out of business soon!'}
					</ul>
				</div>
				<div
					id='school-action-icons'
					className='d-flex flex-column align-items-start align-content-end'
				>
					<Link
						className='item-info'
						to={`/schools/update/${school ? school.id : ''}`}
					>
						<i className='far fa-edit' />
					</Link>
					<Link
						to=''
						className='item-delete'
						onClick={() => this.props.deleteSchool(school.id)}
					>
						<i className='far fa-trash-alt' />
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, { match }) => {
	const schoolId = Number(match.params.id);
	return {
		schoolStudents: state.students.filter(student => {
			return student.schoolId === schoolId;
		}),
		school: state.schools.find(school => school.id === schoolId)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		deleteSchool: id => dispatch(deleteSchool(id))
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SchoolSingle);
