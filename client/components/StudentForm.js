import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStudent, deleteStudent, updateStudent } from '../store';

class StudentForm extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState(this.props.student);
	}

	initialState = student => {
		if (this.props.isUpdate === 'true' && student) {
			const {
				id,
				firstName,
				lastName,
				email,
				imageUrl,
				gpa,
				schoolId
			} = student;

			return {
				id: id ? id : '',
				firstName: firstName ? firstName : '',
				lastName: lastName ? lastName : '',
				email: email ? email : '',
				imageUrl: imageUrl ? imageUrl : '',
				gpa: gpa ? gpa : '',
				schoolId: schoolId ? schoolId : '',
				errors: []
			};
		}
		return {
			id: '',
			firstName: '',
			lastName: '',
			email: '',
			imageUrl: '',
			gpa: '',
			schoolId: '',
			errors: []
		};
	};

	handleChange = ev => {
		this.setState(
			{
				[ev.target.name]: ev.target.value
			}
			// () => console.log(this.state)
		);
	};

	handleSubmit = ev => {
		ev.preventDefault();
		const student = { ...this.state };
		delete student.errors;
		const { createStudent, updateStudent, isUpdate, history } = this.props;

		if (isUpdate === 'false') {
			createStudent(student)
				.then(() => history.push('/students'))
				.catch(error => {
					console.log('student create errors: ', error.response.data.errors);
					this.setState({
						errors: error.response.data.errors
					});
				});
		} else {
			updateStudent(student)
				.then(() => history.push(`/students/${student.id}`))
				.catch(error => {
					console.log('student update errors: ', error.response.data.errors);
					this.setState({
						errors: error.response.data.errors
					});
				});
		}
	};

	render() {
		const { handleChange, handleSubmit } = this;
		const { schools, deleteStudent, isUpdate } = this.props;
		const {
			id,
			firstName,
			lastName,
			email,
			imageUrl,
			gpa,
			schoolId,
			errors
		} = this.state;

		return (
			<form onSubmit={handleSubmit}>
				{errors.length ? (
					<ul className='alert alert-danger'>
						{errors.map((error, idx) => {
							return <li key={idx}>{error}</li>;
						})}
					</ul>
				) : (
					''
				)}
				<div className='form-group'>
					<label htmlFor='firstName'>Name:</label>
					<input
						type='text'
						name='firstName'
						value={firstName}
						onChange={handleChange}
						placeholder='first'
						className='form-control'
					/>
					<input
						type='text'
						name='lastName'
						value={lastName}
						onChange={handleChange}
						placeholder='last'
						className='form-control'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='text'
						name='email'
						value={email}
						onChange={handleChange}
						className='form-control'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='imageUrl'>Image URL:</label>
					<input
						type='text'
						name='imageUrl'
						value={imageUrl}
						onChange={handleChange}
						className='form-control'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='gpa'>GPA:</label>
					<input
						type='text'
						name='gpa'
						value={gpa}
						onChange={handleChange}
						className='form-control'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='school'>Campus:</label>
					<select
						type='text'
						name='schoolId'
						value={schoolId}
						onChange={handleChange}
						className='form-control'
					>
						<option key='none' value=''>
							-- Select School --
						</option>
						{schools.map(school => {
							return (
								<option key={school.id} value={school.id}>
									{school.name}
								</option>
							);
						})}
					</select>
				</div>
				<button type='submit' className='btn btn-primary'>
					{this.props.isUpdate === 'true' ? 'Update' : 'Save'}
				</button>
				{/* TODO */}
				{/* {isUpdate === 'true' ? (
					<button onClick={() => deleteStudent(id)}>
						<i className='far fa-trash-alt' />
					</button>
				) : (
					''
				)} */}
				<Link to={`${isUpdate === 'true' ? `/students/${id}` : '/students'}`}>
					<i className='far fa-window-close' />
				</Link>
			</form>
		);
	}
}

const mapStateToProps = (state, { match, isUpdate }) => {
	let student = {};
	if (isUpdate === 'true') {
		student = state.students.find(
			student => student.id === Number(match.params.id)
		);
	}
	return {
		schools: state.schools,
		student
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createStudent: student => dispatch(createStudent(student)),
		deleteStudent: id => dispatch(deleteStudent(id)),
		updateStudent: student => dispatch(updateStudent(student))
	};
};

StudentForm.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	imageUrl: PropTypes.string,
	gpa: PropTypes.number,
	email: PropTypes.string,
	schoolId: PropTypes.number
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentForm);
