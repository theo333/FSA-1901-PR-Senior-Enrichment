import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Schools = props => {
	const { schools } = props;
	return (
		<ul className='list-group'>
			{schools.map(school => {
				// console.log(school);
				const { id, name, imageUrl } = school;
				return (
					<li key={id} className='list-group-item'>
						<Link to={`/schools/${id}`} className=''>
							<img src={imageUrl} className='school-img' />
							{name}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

const mapStateToProps = state => {
	return {
		schools: state.schools
	};
};

export default connect(mapStateToProps)(Schools);
