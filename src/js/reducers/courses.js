import {
	GET_COURSE_BY_ID,
	GET_LECTURE_BY_ID,
	GET_COURSES_BY_ID
} from "../actions/courses";

function courses(state = {}, action){
	switch (action.type){
		case GET_COURSE_BY_ID :
			const modules = Object.values(action.modules).map(m => {
				return {
					id: m.moduleID,
					name: m.name,
					term: m.term,
					stage: m.stage
				}
			})

			const newModules = {
				modules,
				schoolID: null,
				id: action.courseID
			}

			const item = state.data.filter(d => d.id === newModules.id)[0];
			const pos = state.data.indexOf(item);
			if (pos !== -1) {
				state.data[pos] = { ...state.data[pos], ...newModules };
			} else {
				state.data.push(newModules);
			}

			return {
				...state,
				data: state.data,
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
			case GET_COURSES_BY_ID :
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