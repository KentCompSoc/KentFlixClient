import {
	SET_TOKEN,
	CLEAR_TOKEN
} from "../actions/user";

const initialState = {
	token: localStorage.getItem("token")
}

function user(state = initialState, action){
	switch (action.type){
		case SET_TOKEN :
			return {
				...state,
				token: action.token
			}
		case CLEAR_TOKEN :
			return {
				...state,
				token: null
			}
		default :
			return state
	}
}

export default user;