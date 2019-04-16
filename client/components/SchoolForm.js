import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createSchool, updateSchool } from '../store';

class SchoolForm extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState(this.props.school);
	}

	initialState = school => {
		if (this.props.isUpdate && school) {
			const { id, name, imageUrl, address, description } = school;
			return {
				id: id ? id : '',
				name: name ? name : '',
				imageUrl: imageUrl ? imageUrl : '',
				address: address ? address : '',
				description: description ? description : '',
				errors: []
			};
		}
		return {
			id: '',
			name: '',
			imageUrl: '',
			address: '',
			description: '',
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
		const school = { ...this.state };
		delete school.errors;
		const { createSchool, updateSchool, isUpdate, history } = this.props;
		if (isUpdate === 'false') {
			// console.log('isUpdate: ', false);
			createSchool(school)
				.then(() => history.push('/schools'))
				.catch(error => {
					console.log('school create errors: ', error.response.data.errors);
					this.setState({
						errors: error ? error.response.data.errors : []
					});
				});
		} else {
			// console.log('isUpdate: ', true);
			updateSchool(school)
				.then(() => history.push(`/schools/${school.id}`))
				.catch(error => {
					console.log('school update errors: ', error.response.data.errors);
					this.setState({
						errors: error.response.data.errors
					});
				});
		}
	};

	render() {
		const { handleChange, handleSubmit } = this;
		const { id, name, imageUrl, address, description, errors } = this.state;
		return (
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Campus Name:</label>
					<input
						type='text'
						name='name'
						value={name}
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
					<label htmlFor='address'>Address:</label>
					<input
						type='text'
						name='address'
						value={address}
						onChange={handleChange}
						className='form-control'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='description'>Description:</label>
					<textarea
						type='text'
						name='description'
						value={description}
						onChange={handleChange}
						className='form-control'
						rows='5'
					/>
				</div>
				<button type='submit' className='btn btn-primary'>
					{this.props.isUpdate === 'true' ? 'Update' : 'Save'}
				</button>
				<Link
					to={`${
						this.props.isUpdate === 'true' ? `/schools/${id}` : '/schools'
					}`}
				>
					<i className='far fa-window-close' />
				</Link>
			</form>
		);
	}
}

const mapStateToProps = (state, { match, isUpdate }) => {
	let school = {};
	if (isUpdate === 'true') {
		school = state.schools.find(
			school => school.id === Number(match.params.id)
		);
	}
	return {
		school
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createSchool: school => dispatch(createSchool(school)),
		updateSchool: school => dispatch(updateSchool(school))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SchoolForm);
