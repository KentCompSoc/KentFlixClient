import {
	GET_LECTURE_BY_ID,
	GET_LECTURES_BY_MODULE_ID
} from "../actions/lectures";

function lectures(state = {}, action){
	switch (action.type){
		case GET_LECTURE_BY_ID : 
			const { lecture } = action;
			return {
				...state,
				[lecture.moduleID]: {
					...state[lecture.moduleID],
					[lecture.lectureID]: {
						lectureID: lecture.lectureID,
						data: lecture.date,
						duration: lecture.duration,
						title: lecture.title,
						description: lecture.description,
						author: lecture.author,
						moduleID: lecture.moduleID,
						videoLength: lecture.videoLength,
						videoURL: lecture.videoURL
					}
				}
			}
		case GET_LECTURES_BY_MODULE_ID :
			const { lectures } = action;
			return {
				...state,
				[lectures.moduleID]: lectures
			}
		default :
			return state
	}
}

export default lectures;