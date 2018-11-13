import {
	GET_SCHOOL_BY_ID,
} from "../actions/schools";

function schools(state = {}, action){
	switch (action.type){
		case GET_SCHOOL_BY_ID :
			return {
				...state,
				course: action.course,
				module: action.module,
				error: action.error
			}
		default :
			return state
	}
}

export default schools;