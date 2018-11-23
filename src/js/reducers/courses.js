import {
	GET_COURSE_BY_ID,
	GET_COURSES_BY_SCHOOL_ID
} from "../actions/courses";

function courses(state = {}, action){
	switch (action.type){
		case GET_COURSE_BY_ID :
			console.log(action);
			return {
				...state,
				[action.course.schoolID]: {
					...state[action.course.schoolID],
					[action.course.id]: {
						name: action.course.name,
						id: action.course.id,
					}
				}
			}
		case GET_COURSES_BY_SCHOOL_ID :
			console.log(action.data);
			return {
				...state,
				[action.schoolID]: action.data
			}
		default :
			return state
	}
}

export default courses;