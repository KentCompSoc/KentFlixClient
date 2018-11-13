export const GET_SCHOOL_BY_ID = "GET_SCHOOL_BY_ID";

const baseURL = "https://kentflix-7f510.firebaseapp.com/api/v1/";

/**
 * Gets the school by it's id
 * @param {string} token The users token
 * @param {string} schoolID The schools id
 */
export function getSchoolById({token, schoolID}) {
	const request = fetch(`${baseURL}/${token}/schools/${schoolID}/courses`);
	return dispatch => {
		dispatch({
			type: GET_SCHOOL_BY_ID,
			error: null,
		})
		request.then(response => response.json()).then(data => {
			if(data.error) {
				console.error(data.error.message);
				dispatch({
					type: GET_SCHOOL_BY_ID,
					error: data.error.message,
				})
			}

			if(data.success) {
				const course = data.payload.filter(item => item.lectures);
				const module = data.payload.filter(item => item.schools);
				console.log(course)
				dispatch({
					type: GET_SCHOOL_BY_ID,
					course,
					module,
				})
			}

		}).catch(error => {
			console.error(error);
				dispatch({
					type: GET_SCHOOL_BY_ID,
					error: "An unexpected error occurred",
				})
		});
	}
}