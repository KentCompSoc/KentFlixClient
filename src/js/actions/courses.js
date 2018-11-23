export const GET_COURSE_BY_ID = "GET_COURSE_BY_ID";
export const GET_COURSES_BY_SCHOOL_ID = "GET_COURSES_BY_SCHOOL_ID";
export const DISPLAY_ERROR = "DISPLAY_ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";

const baseURL = "https://api.kentflix.com/v1";
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
	const request = fetch(`${baseURL}/${token}/courses/${courseID}`,
		getHeader);
	return dispatch => {
		dispatch({ type: REMOVE_ERROR })
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
					course: data.payload,
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
 * Gets the courses by school id
 * @param {string} token The users token
 * @param {string} schoolID The school id
 */
export function getCoursesBySchoolID({ token, schoolID }) {
	const request = fetch(
		`${baseURL}/${token}/schools/${schoolID}/courses`, getHeader
	);
	return dispatch => {
		dispatch({ type: REMOVE_ERROR })
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
					type: GET_COURSES_BY_SCHOOL_ID,
					data: data.payload,
					schoolID
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