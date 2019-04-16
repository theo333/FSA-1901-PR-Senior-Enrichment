import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// action types
const GET_SCHOOLS = 'GET_SCHOOLS';
const GET_STUDENTS = 'GET_STUDENTS';
const GET_SCHOOLS_AFTER_CREATE_SCHOOL = 'GET_SCHOOLS_AFTER_CREATE_SCHOOL';
const GET_STUDENTS_AFTER_CREATE_STUDENT = 'GET_STUDENTS_AFTER_CREATE_STUDENT';

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

const getSchoolsAfterCreateSchool = school => {
	return {
		type: GET_SCHOOLS_AFTER_CREATE_SCHOOL,
		school
	};
};

const getStudentsAfterCreateStudents = student => {
	return {
		type: GET_STUDENTS_AFTER_CREATE_STUDENT,
		student
	};
};

// thunks

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

const createSchool = school => {
	return dispatch => {
		return axios
			.post('/api/schools/create', school)
			.then(({ data }) => dispatch(getSchoolsAfterCreateSchool(data)));
	};
};

const createStudent = student => {
	return dispatch => {
		return axios
			.post('/api/students/create', student)
			.then(({ data }) => dispatch(getStudentsAfterCreateStudents(data)));
	};
};

const deleteSchool = schoolId => {
	return dispatch => {
		return axios
			.delete(`/api/schools/delete/${schoolId}`)
			.then(() => dispatch(fetchSchools()));
	};
};

const deleteStudent = studentId => {
	return dispatch => {
		return axios
			.delete(`/api/students/delete/${studentId}`)
			.then(() => dispatch(fetchStudents()));
	};
};

const updateSchool = school => {
	// console.log('updateSchool - school.id: ', school.id);
	return dispatch => {
		return axios
			.put(`/api/schools/update/${school.id}`, school)
			.then(() => dispatch(fetchSchools()));
	};
};

const updateStudent = student => {
	return dispatch => {
		return axios
			.put(`/api/students/update/${student.id}`, student)
			.then(() => dispatch(fetchStudents()));
	};
};

// reducers

const schools = (state = [], action) => {
	switch (action.type) {
		case GET_SCHOOLS:
			return action.schools;
		case GET_SCHOOLS_AFTER_CREATE_SCHOOL:
			return [...state, action.school];
		default:
			return state;
	}
};

const students = (state = [], action) => {
	switch (action.type) {
		case GET_STUDENTS:
			return action.students;
		case GET_STUDENTS_AFTER_CREATE_STUDENT:
			return [...state, action.student];
		default:
			return state;
	}
};

const reducer = combineReducers({
	schools,
	students
});

const store = createStore(reducer, applyMiddleware(thunk));

export {
	store,
	fetchSchools,
	fetchStudents,
	createSchool,
	createStudent,
	deleteSchool,
	deleteStudent,
	updateSchool,
	updateStudent
};
