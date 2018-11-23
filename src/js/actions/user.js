export const LOGIN = "LOGIN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";

const baseURL = "https://api.kentflix.com/v1";
/**
 * Logs the user in setting their token
 * @param {string} email The users email
 * @param {string} password The users password
 */
export function login({email, password}) {
	const request = fetch(`${baseURL}/login`, {
		method: "POST",
		mode: "cors",
		cache: "default",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		redirect: "follow",
		referrer: "no-referrer",
		body: JSON.stringify({ email, password }),
	});

	return dispatch => {
		dispatch({
			type: LOGIN,
			error: null,
			loading: true
		})
		request.then(response => response.json()).then(data => {
			if(data.error) {
				console.error(data.error.message);
				dispatch({
					type: LOGIN,
					error: data.error.message,
					loading: false
				})
			}

			if(data.success) {
				localStorage.setItem("token", data.payload.sessionID);
				dispatch({
					type: LOGIN,
					token: data.payload.sessionID,
					loading: false
				})
			}

		}).catch(error => {
			console.error(error);
				dispatch({
					type: LOGIN,
					error,
					loading: false
				})
		});
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