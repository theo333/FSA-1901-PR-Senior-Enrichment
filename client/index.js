import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { store } from './store';

const root = document.querySelector('#root');
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	root
);
