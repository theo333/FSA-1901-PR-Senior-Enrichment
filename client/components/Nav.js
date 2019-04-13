import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location }) => {
	const pages = [
		{ key: 1, url: '/', name: 'Home' },
		{ key: 2, url: '/campuses', name: 'Campuses' },
		{ key: 3, url: '/students', name: 'Students' }
	];

	return (
		<ul className='nav nav-pills'>
			{pages.map(page => {
				const { key, url, name } = page;
				return (
					<li key={key} className='nav-item'>
						<Link to={url} className='nav-link'>
							{name}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default Nav;
