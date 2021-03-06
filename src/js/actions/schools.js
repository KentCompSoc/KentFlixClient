export const GET_SCHOOL_BY_ID = "GET_SCHOOL_BY_ID";
export const GET_SCHOOLS = "GET_SCHOOLS";
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
 * Gets the school by it's id
 * @param {string} token The users token
 * @param {string} schoolID The schools id
 */
export function getSchoolById({ token, schoolID }) {
	const request = fetch(`${baseURL}/${token}/schools/${schoolID}/courses`,
		getHeader
	);
	return dispatch => {
		dispatch({ type: REMOVE_ERROR })
		request.then(response => response.json()).then(data => {
			if (data.error) {
				console.error(data.error.message);
				dispatch({
					type: DISPLAY_ERROR,
					error: data.error.message,
				})
			}

			if (data.success) {
				dispatch({
					type: GET_SCHOOL_BY_ID,
					schoolID,
					courses: data.payload,
				})
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
 * Gets all schools
 * @param {string} token The users token
 */
export function getSchools({ token }) {
	const request = fetch(`${baseURL}/${token}/schools`, getHeader);
	return dispatch => {
		dispatch({ type: REMOVE_ERROR })
		request.then(response => response.json()).then(data => {
			if (data.error) {
				console.error(data.error.message);
				dispatch({
					type: DISPLAY_ERROR,
					error: data.error.message,
				})
			}

			if (data.success) {
				dispatch({
					type: GET_SCHOOLS,
					schools: data.payload
				})
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