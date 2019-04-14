import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const School = props => {
	console.log(props.students);
	// .filter(student => student.schoolId === schoolId)
	return <div>school single</div>;
};

const mapStateToProps = (state, { match }) => {
	const schoolId = match.params.id;
	return {
		students: state.students
	};
};

// School.PropTypes = {

// }

export default connect(mapStateToProps)(School);
