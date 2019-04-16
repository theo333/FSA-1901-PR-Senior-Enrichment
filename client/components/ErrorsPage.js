import React from 'react';
import { Link } from 'react-router-dom';

const ErrorsPage = () => {
	return (
		<div>
			<h2>Oops! This page does not exist. :)</h2>
			<Link to='/schools'>Return to Home Page</Link>
		</div>
	);
};

export default ErrorsPage;
