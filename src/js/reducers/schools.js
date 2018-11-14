import {
	GET_SCHOOL_BY_ID,
	GET_SCHOOLS,
	START_REQUEST,
	DISPLAY_ERROR
} from "../actions/schools";

const initialState = {
	data: []
}

function schools(state = initialState, action){
	switch (action.type){
		case START_REQUEST :
			return {
				...state,
				error: null,
				loading: true
			}
		case DISPLAY_ERROR :
			return {
				...state,
				error: action.error,
				loading: false
			}
		case GET_SCHOOL_BY_ID :
			const newSchool = {
				id: action.schoolID,
				courses: action.courses,
				modules: action.modules, 
			};
			const item = state.data.filter(d => d.id === newSchool.id)[0];
			const pos = state.data.indexOf(item);
			if(pos !== -1) {
				state.data[pos] = {...state.data[pos], ...newSchool};
			} else {
				state.data.push(newSchool);
			}
			return {
				...state,
				data: state.data,
				loading: false,
			}
		case GET_SCHOOLS :
			action.schools.forEach(s => {
				const newSchool = {
					id: s.id,
					name: s.name
				}
				const item = state.data.filter(d => d.id === s.id)[0];
				const pos = state.data.indexOf(item);
				if(pos !== -1) {
					state.data[pos] = {...state.data[pos], ...newSchool};
				} else {
					state.data.push(newSchool);
				}
			})
			return {
				...state,
				data: state.data,
				loading: false,
			}
		default :
			return state
	}
}

export default schools;