import {
	LOGIN,
	CLEAR_TOKEN
} from "../actions/user";

const initialState = {
	token: localStorage.getItem("token")
}

function user(state = initialState, action){
	switch (action.type){
		case LOGIN :
			return {
				...state,
				token: action.token,
				error: action.error,
				loading: action.loading
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