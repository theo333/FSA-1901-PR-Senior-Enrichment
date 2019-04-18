import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteSchool } from '../store';

const Schools = props => {
	const { schools, deleteSchool } = props;
	return (
		<Fragment>
			<div className='plus-add-item d-flex justify-content-end align-items-center'>
				<Link to='/schools/create' className='align-right'>
					<i className='fas fa-plus' /> Campus
				</Link>
			</div>
			<ul className='list-group'>
				{schools.map(school => {
					const { id, name, imageUrl } = school;
					return (
						<div>
							<li
								key={id}
								className='list-group-item d-flex flex-row justify-content-between'
							>
								<Link to={`/schools/${id}`} className=''>
									<img src={imageUrl} className='school-list-img' />
									<span className='school-list-name'>{name}</span>
								</Link>
								<div
									id='school-action-icons'
									className='d-flex flex-column align-items-start align-content-end'
								>
									<Link className='item-info' to={`/schools/${id}`}>
										<i className='fas fa-info-circle' />
									</Link>
									<Link
										to=''
										className='item-delete'
										onClick={() => deleteSchool(id)}
									>
										<i className='far fa-trash-alt' />
									</Link>
								</div>
							</li>
						</div>
					);
				})}
			</ul>
		</Fragment>
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
