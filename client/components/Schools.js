import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteSchool } from '../store';

const Schools = props => {
	const { schools, deleteSchool } = props;
	return (
		<div>
			<div className='d-flex justify-content-end'>
				<Link to='/schools/create' className='align-right'>
					<i className='fas fa-plus plus-add-item' />
				</Link>
			</div>

			<div className=''>
				<div className=''>
					<ul className='list-group'>
						{schools.map(school => {
							const { id, name, imageUrl } = school;
							return (
								<li
									key={id}
									className='list-group-item d-flex flex-row justify-content-between'
								>
									<Link to={`/schools/${id}`} className=''>
										<img src={imageUrl} className='school-img-list' />
										{name}
									</Link>
									<div className='d-flex flex-column align-items-start align-content-end'>
										<Link className='item-info' to={`/schools/${id}`}>
											<i class='fas fa-info-circle' />
										</Link>
										<Link
											className='item-delete'
											onClick={() => deleteSchool(id)}
										>
											<i className='far fa-trash-alt' />
										</Link>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		schools: state.schools
	};
};

const mapDispatchToProps = dispatch => {
	return {
		deleteSchool: id => dispatch(deleteSchool(id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Schools);
