import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchSchools, fetchStudents } from '../store';
import Nav from './Nav';
import Schools from './Schools';
import Students from './Students';
import SchoolSingle from './SchoolSingle';
import StudentSingle from './StudentSingle';
import SchoolForm from './SchoolForm';
import StudentForm from './StudentForm';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
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
					<Route
						exact
						path='/schools/create'
						render={({ match, history }) => (
							<SchoolForm isUpdate='false' match={match} history={history} />
						)}
					/>
					<Route
						exact
						path='/students/create'
						render={({ match, history }) => (
							<StudentForm isUpdate='false' match={match} history={history} />
						)}
					/>
					<Route
						exact
						path='/schools/update/:id'
						render={({ match, history }) => (
							<SchoolForm isUpdate='true' match={match} history={history} />
						)}
					/>
					<Route
						exact
						path='/students/update/:id'
						render={({ match, history }) => (
							<StudentForm isUpdate='true' match={match} history={history} />
						)}
					/>
					<Route path='/schools/:id' component={SchoolSingle} />
					<Route path='/students/:id' component={StudentSingle} />
					{/* <Route component={ErrorsPage} /> */}
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
