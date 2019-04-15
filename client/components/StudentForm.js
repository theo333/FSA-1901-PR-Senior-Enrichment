import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStudent } from '../store';

class StudentForm extends Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			imageUrl: '',
			gpa: '',
			schoolId: '',
			errors: []
		};
	}

	handleChange = ev => {
		this.setState(
			{
				[ev.target.name]: ev.target.value
			},
			() => console.log(this.state)
		);
	};

	handleSubmit = ev => {
		ev.preventDefault();
		const student = { ...this.state };
		delete student.errors;

		if (this.props.createStudent) {
			this.props
				.createStudent(student)
				.then(() => this.props.history.push('/students'))
				.catch(err => {
					console.log('StudentForm error on create: ', err);
					this.setState({ errors: [...err.response.data.errors] });
				});
		}
	};

	render() {
		const { handleChange, handleSubmit } = this;
		const { schools } = this.props;
		const {
			firstName,
			lastName,
			email,
			imageUrl,
			gpa,
			schoolId,
			errors
		} = this.state;

		// console.log('StudentForm props: ', this.props);
		return (
			<form onSubmit={handleSubmit}>
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
					Save | Update
				</button>
				<Link to='/students'>
					<i className='far fa-window-close' />
				</Link>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		schools: state.schools
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createStudent: student => dispatch(createStudent(student))
	};
};

StudentForm.propTypes = {
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
