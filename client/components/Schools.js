import React from 'react';
import { connect } from 'react-redux';

const Schools = props => {
	const { schools } = props;
	return (
		<ul className='list-group'>
			{schools.map(school => {
				const { id, name } = school;
				return (
					<li key={id} className='list-group-item'>
						{name}
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