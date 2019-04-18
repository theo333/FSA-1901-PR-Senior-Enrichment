import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({ location }) => {
	const { pathname } = location.location;
	const pages = [
		{ key: 1, url: '/schools', name: 'Campuses' },
		{ key: 2, url: '/students', name: 'Students' }
	];

	return (
		<div>
			<ul className='nav nav-pills'>
				{pages.map(page => {
					const { key, url, name } = page;
					return (
						<li key={key} className='nav-item'>
							<NavLink to={url} className={`nav-link`} activeClassName='active'>
								{name}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Nav;
