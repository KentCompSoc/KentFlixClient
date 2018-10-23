import React, { Component } from 'react';
import "../../css/Home.css";

class Home extends Component {
	state = {
		schools: null,
		loading: true,
		error: false,
	}

	componentDidMount() {
		this.getSchools().then(data => {
			// FIXME: API needs to respond with 400 error
			if(data.error) {
				this.setState({ error: data.infoMessage, loading: false })
				console.error(data.infoMessage);
				return;
			}
			this.setState({ schools: data.result, loading: false })
		}).catch(error => {
			console.error(error);
			this.setState({ error, loading: false })
		})
	}

	/**
	 * Gets the course
	 * @param {string} courseID The course id
	 * @returns {promise} Returns a promise from the request
	 */
	getSchools = () => {
		return fetch("https://kentflix-7f510.firebaseapp.com/api/v1/schools", {
			method: "GET",
			mode: "cors",
			cache: "default",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			redirect: "follow",
			referrer: "no-referrer",
		}).then(response => response.json());
	}
	render() {
		const { loading, error, schools } = this.state;
		return (
			<div className="row">
				<div className="col-sm-12"><h2>Schools</h2></div>
				{( loading && (
					<div className="loading">
						<div className="spinner primary"></div>
					</div>
				))}

				{( error && (
					<div>
						Error: { error }
					</div>
				))}

				{( schools && (
					<div>
						Loaded
					</div>
				))}	
			</div>
		)
	}
};

export default Home;
