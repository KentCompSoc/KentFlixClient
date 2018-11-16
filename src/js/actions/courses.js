export const GET_COURSE_BY_ID = "GET_COURSE_BY_ID";
export const GET_LECTURE_BY_ID = "GET_LECTURE_BY_ID";
export const DISPLAY_ERROR = "DISPLAY_ERROR";
export const START_REQUEST = "START_REQUEST";

const baseURL = "https://kentflix-7f510.firebaseapp.com/api/v1";
const getHeader = {
	method: "GET",
	mode: "cors",
	cache: "default",
	credentials: "same-origin",
	headers: {
		"Content-Type": "application/json; charset=utf-8",
	},
	redirect: "follow",
	referrer: "no-referrer",
}

/**
 * Gets the course by it's id
 * @param {string} token The users token
 * @param {string} courseID The courses id
 */
export function getCourseById({token, courseID}) {
	const request = fetch(`${baseURL}/${token}/courses/${courseID}/modules`,
		getHeader);
	return dispatch => {
		dispatch({ type: START_REQUEST })
		request.then(response => response.json()).then(data => {
			if(data.error) {
				console.error(data.error.message);
				dispatch({
					type: DISPLAY_ERROR,
					error: data.error.message,
				})
			}

			if(data.success) {
				dispatch({
					type: GET_COURSE_BY_ID,
					courseID,
					modules: data.payload,
				});
			}

		}).catch(error => {
			console.error(error);
				dispatch({
					type: DISPLAY_ERROR,
					error: "An unexpected error occurred",
				})
		});
	}
}

/**
 * Gets the course by it's id
 * TODO: Wait for api to be fixed
 * @param {string} token The users token
 * @param {string} lectureID The lecture id
 */
export function getLectureById({token, lectureID}) {
	const request = fetch(`${baseURL}/${token}/lectures/${lectureID}`, getHeader);
	return dispatch => {
		dispatch({ type: START_REQUEST })
		request.then(response => response.json()).then(data => {
			if(data.error) {
				console.error(data.error.message);
				dispatch({
					type: DISPLAY_ERROR,
					error: data.error.message,
				})
			}

			if(data.success) {
				dispatch({
					type: GET_LECTURE_BY_ID,
					data: data.payload,
				});
			}

		}).catch(error => {
			console.error(error);
				dispatch({
					type: DISPLAY_ERROR,
					error: "An unexpected error occurred",
				})
		});
	}
}