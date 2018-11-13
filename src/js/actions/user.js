export const SET_TOKEN = "SET_TOKEN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";

/**
 * Sets the user token
 * @param {string} token The users token
 */
export function setToken(token) {
	return dispatch => {
		localStorage.setItem("token", token);
		dispatch({
			type: SET_TOKEN,
			token
		})
	}
}

/**
 * Deletes the user token
 */
export function clearToken() {
	return dispatch => {
		localStorage.removeItem("token");
		dispatch({
			type: CLEAR_TOKEN,
		})
	}
}