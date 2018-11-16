import {
	GET_COURSE_BY_ID,
	GET_LECTURE_BY_ID,
	START_REQUEST,
	DISPLAY_ERROR
} from "../actions/courses";

const initialState = {
	data: []
}

function courses(state = initialState, action){
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
		case GET_COURSE_BY_ID :
			const modules = Object.values(action.modules).map(m => {
				return {
					id: m.moduleID,
					name: m.name,
					term: m.term,
					stage: m.stage
				}
			})

			return {
				...state,
				data: [
					{
						modules,
						schoolID: null,
						id: action.courseID
					},
				],
				loading: false,
			}
		case GET_LECTURE_BY_ID : 
			console.log(action.data);
			/*
			const newLecture = {
				id: action.data.courseID,
				lectures: action.data.lectures,
				name: action.data.name,
				schoolID: action.data.schoolID
			};
			const item = state.data.filter(d => d.id === newCourse.id)[0];
			const pos = state.data.indexOf(item);
			if(pos !== -1) {
				state.data[pos] = {...state.data[pos], ...newCourse};
			} else {
				state.data.push(newCourse);
			}
			return {
				...state,
				data: state.data,
				loading: false,
			}*/
			return state
		default :
			return state
	}
}

export default courses;