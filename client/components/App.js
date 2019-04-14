import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchSchools, fetchStudents } from '../store';
import Nav from './Nav';
import Schools from './Schools';
import Students from './Students';
import SchoolSingle from './SchoolSingle';
import StudentSingle from './StudentSingle';

class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.fetchSchools();
		this.props.fetchStudents();
	}

	render() {
		return (
			<Router>
				<h1>Campuses and Students</h1>
				<Route render={location => <Nav location={location} />} />
				<Switch>
					<Route exact path='/schools' component={Schools} />
					<Route exact path='/students' component={Students} />
					<Route path='/schools/:id' component={SchoolSingle} />
					<Route path='/students/:id' component={StudentSingle} />
				</Switch>
			</Router>
		);
	}
}

const mapStateToProps = state => {
	return {
		schools: state.schools,
		students: state.students
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchSchools: () => dispatch(fetchSchools()),
		fetchStudents: () => dispatch(fetchStudents())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
