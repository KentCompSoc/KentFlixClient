import {
	GET_SCHOOL_BY_ID,
	GET_SCHOOLS
} from "../actions/schools";

function schools(state = {}, action) {
	switch (action.type) {
		case GET_SCHOOL_BY_ID:
			const newSchool = {
				id: action.schoolID,
				courses: action.courses,
			};
			return {
				...state,
				[newSchool.id]: newSchool
			}
		case GET_SCHOOLS:
			return {
				...state,
				...action.schools
			}
		default:
			return state
	}
}

export default schools;