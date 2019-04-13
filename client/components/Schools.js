import React from 'react';
import { connect } from 'react-redux';

import { fetchSchools } from '../store';

const Schools = props => {
	const { schools } = props;
	return (
		<ul className=''>
			{schools.map(school => {
				const { id, name } = school;
				return (
					<li key={id} className=''>
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

// const mapDispatchToProps = dispatch => {
// 	return (
// 		schools: ()=> dispatch(fetchSchools())
// 	)
// };

export default connect(mapStateToProps)(Schools);
