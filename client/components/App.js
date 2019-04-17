import React, { Component } from 'react';
import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchSchools, fetchStudents } from '../store';
import Nav from './Nav';
import Schools from './Schools';
import Students from './Students';
import SchoolSingle from './SchoolSingle';
import StudentSingle from './StudentSingle';
import SchoolForm from './SchoolForm';
import StudentForm from './StudentForm';
import ErrorsPage from './ErrorsPage';

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
				<header id='main-header'>
					<div id='site-name' className='flex-container'>
						Campus Directory
					</div>
					<nav id='main-nav' className='flex-container'>
						<Route render={location => <Nav location={location} />} />
					</nav>
				</header>
				<section id='content' className='container-fluid'>
					<Switch>
						<Route exact path='/' render={() => <Redirect to='/schools' />} />
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
						<Route component={ErrorsPage} />
					</Switch>
				</section>
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
