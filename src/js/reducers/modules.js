import {
	GET_COURSE_MODULES_BY_COURSE_ID
} from "../actions/modules";

function lectures(state = {}, action){
	switch (action.type){
		case GET_COURSE_MODULES_BY_COURSE_ID : 
			return {
				...state,
				[action.courseID]: action.modules
			}
		default :
			return state
	}
}

export default lectures;