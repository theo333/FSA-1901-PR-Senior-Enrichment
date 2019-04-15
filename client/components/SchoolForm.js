import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createSchool } from '../store';

class SchoolForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			imageUrl: '',
			address: '',
			description: '',
			errors: []
		};
	}

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
		if (this.props.createSchool) {
			this.props
				.createSchool(school)
				.then(() => this.props.history.push('/schools'))
				.catch(err => {
					console.log('create school errors: ', err);
					this.setState({ errors: [...err.response.data.errors] });
				});
		}
	};

	render() {
		const { handleChange, handleSubmit } = this;
		const { name, imageUrl, address, description, errors } = this.state;
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
					Save | Update
				</button>
				<Link to='/schools'>
					<i className='far fa-window-close' />
				</Link>
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createSchool: school => dispatch(createSchool(school))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(SchoolForm);
