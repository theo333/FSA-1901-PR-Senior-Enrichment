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
				<ul className='list-group'>
					<li className='list-group-item'>test1</li>
					<li className='list-group-item'>test2</li>
					<li className='list-group-item'>test3</li>
					<li className='list-group-item'>test4</li>
					<li className='list-group-item'>test5</li>
					<li className='list-group-item'>test6</li>
				</ul>
				<div className=''>
					<ul className='d-flex flex-row flex-wrap justifiy-content-around'>
						{schools.map(school => {
							const { id, name, imageUrl } = school;
							return (
								// col-lg-6 float-left
								<div className=''>
									<li key={id} className='flex-fill'>
										<Link to={`/schools/${id}`} className=''>
											<img src={imageUrl} className='school-img-list' />
											{name}
										</Link>
										<button onClick={() => deleteSchool(id)}>
											<i className='far fa-trash-alt' />
										</button>
									</li>
								</div>
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
