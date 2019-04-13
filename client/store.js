import React from 'react';
import { createStore } from 'redux';

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

const initialState = {
	schools: [],
	students: []
};

const schoolsReducer = (state = initialState.schools, action) => {
	switch (action) {
		case GET_SCHOOLS:
			return action.schools;
		default:
			return state;
	}
};

const studentsReducer = (state = initialState.students, action) => {
	switch (action) {
		case GET_STUDENTS:
			return action.students;
		default:
			return state;
	}
};

const reducer = combineReducers({
	schoolsReducer,
	studentsReducer
});

const store = createStore(reducer);

export { store, fetchSchools, fetchStudents };
