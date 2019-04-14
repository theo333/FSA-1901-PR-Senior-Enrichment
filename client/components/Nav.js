import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location }) => {
	const { pathname } = location.location;
	const pages = [
		{ key: 1, url: '/schools', name: 'Campuses' },
		{ key: 2, url: '/students', name: 'Students' }
	];

	return (
		<ul className='nav nav-pills'>
			{pages.map(page => {
				const { key, url, name } = page;
				return (
					<li key={key} className='nav-item'>
						<Link
							to={url}
							className={`nav-link${url === pathname ? ' active' : ''}`}
						>
							{name}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default Nav;
