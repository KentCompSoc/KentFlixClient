import { REMOVE_ERROR, DISPLAY_ERROR } from "../actions/schools";

function error(state = {}, action){
	switch (action.type){
		case REMOVE_ERROR :
			return {
				...state,
				message: null
			};
		case DISPLAY_ERROR :
			return {
				...state,
				message: action.error
			}
		default :
			return state
	}
}

export default error;