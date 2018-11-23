export const GET_LECTURES_BY_MODULE_ID = "GET_LECTURES_BY_MODULE_ID";
export const GET_LECTURE_BY_ID = "GET_LECTURE_BY_ID";
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
 * Gets the lecture by it's id
 * @param {string} token The users token
 * @param {string} lectureID The lecture id
 */
export function getLectureById({token, lectureID}) {
	const request = fetch(`${baseURL}/${token}/lectures/${lectureID}`, getHeader);
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
					type: GET_LECTURE_BY_ID,
					lecture: data.payload,
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
 * Gets the lecture by the modules id
 * @param {string} token The users token
 * @param {string} moduleID The module id
 */

export function getLecturesByModuleID({token, moduleID}) {
	const request = fetch(
		`${baseURL}/${token}/modules/${moduleID}/lectures/`,
		getHeader
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
					type: GET_LECTURES_BY_MODULE_ID,
					lectures: data.payload,
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