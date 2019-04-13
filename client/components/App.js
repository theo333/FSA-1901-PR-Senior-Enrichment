import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';

export default class App extends Component {
	render() {
		return (
			<Router>
				<h1>Campuses and Students</h1>
				<Route render={location => <Nav location={location} />} />
				{/* <Route path='/schools' component={Schools}/> */}
			</Router>
		);
	}
}
