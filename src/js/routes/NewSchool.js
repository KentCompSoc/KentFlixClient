import React, { Component } from "react";
import '../../css/Form.css';

/**
 * A form to submit a new course rss which is converted into json data and
 * submitted to the server.
 */
class NewSchool extends Component {
	state = {
		name: {
			value: "",
			error: "",
		},
		loading: false,
		success: false
	};

	/**
	 * Updates the value of a input as the user types inside it
	 * @param {String} type Which input to update
	 */
	handleChange = type => event => {
		this.setState({
			[type]: { value: event.target.value }
		});
	};

	/**
	 * Handles form submission.
	 */
	submit = () => event => {
		event.preventDefault();
		const name = this.state.name.value;

		if (!name) {
			this.setState({
				name: { error: "Please provide the name of the school" }
			})
			return;
		}

		const matches = name.toLowerCase().match(/\b(\w)/g);
		const id = matches.join('');

		console.log("Submitting form...");

		this.setState({ loading: true });

		this.submitSchool({ schoolName: name, schoolID: id })
			.then(data => {
				console.log(JSON.stringify(data));
				return (
					<div>It worked</div>
				)
			})
			// TODO: Process errors
			.catch(error => {
				console.error(error);
				this.setState({ loading: false })
			});
	}

	/**
	 * Uploads the rss feed to the database
	 * @param {object} data The data to be uploaded
	 * @returns {promise} Returns a promise from the request
	 */
	submitSchool = ({ schoolID, schoolName }) => {
		return fetch("https://kentflix-7f510.firebaseapp.com/api/v1/schools/"+schoolID+"/"+schoolName, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			redirect: "follow",
			referrer: "no-referrer",
		}).then(response => response.json())
		.catch(error => console.error(error));
	}

	render() {
		const { name, loading } = this.state;
		return (
			<div className="row">
				<div className="
					col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3
				">
					<form onSubmit={this.submit()} autoComplete="on">
						<legend><h1 className="form-header">Register a school</h1></legend>
						<div className="input-group vertical">
							<label htmlFor="name">
								School name
								{ name.error && (
									<mark className="secondary">{name.error}</mark>
								)}
							</label>
							<input
								onChange={this.handleChange("name")}
								value={name.value || ''}
								type="text"
								id="name"
								name="name"
								placeholder="School name"
								disabled={loading}
								autoFocus
							/>
						</div>
						<div className="btn-container">
							{ loading && (
								<div className="loading">
									<div className="spinner primary"></div>
								</div>
							)}
							<div className="button-group btn-group">
								<button
									className="primary shadowed btn-1"
									type="submit"
									disabled={loading}
								>
									Register school
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default NewSchool;
