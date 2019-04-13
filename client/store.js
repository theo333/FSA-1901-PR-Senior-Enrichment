import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// action types
const GET_SCHOOLS = 'GET_SCHOOLS';
const GET_STUDENTS = 'GET_STUDENTS';

// action creators
const getSchools = schools => {
	return {
		type: GET_SCHOOLS,
		schools
	};
};

const getStudents = students => {
	return {
		type: GET_STUDENTS,
		students
	};
};

const fetchSchools = () => {
	return dispatch => {
		return axios.get('/api/schools').then(({ data }) => {
			dispatch(getSchools(data));
		});
	};
};

const fetchStudents = () => {
	return dispatch => {
		return axios.get('/api/students').then(({ data }) => {
			dispatch(getStudents(data));
		});
	};
};

const schools = (state = [], action) => {
	switch (action.type) {
		case GET_SCHOOLS:
			return action.schools;
		default:
			return state;
	}
};

const students = (state = [], action) => {
	switch (action.type) {
		case GET_STUDENTS:
			return action.students;
		default:
			return state;
	}
};

const reducer = combineReducers({
	schools,
	students
});

const store = createStore(reducer, applyMiddleware(thunk));

export { store, fetchSchools, fetchStudents };
