import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../css/Form.css';

class Register extends Component {
	state = {
		kentID: {
			value: '',
			error: '',
		},
		password: {
			value: '',
			error: '',
		},
		loading: false,
		error: ''
	};

	handleChange = type => event => {
		this.setState({
			[type]: { value: event.target.value }
		});
	};

	submit = () => event => {
		let kentID = this.state.kentID.value;
		const password = this.state.password.value;

		event.preventDefault();
		if(!kentID) {
			this.setState({
				kentID: { error: "Please provide a KentID" }
			})
		}
		if(!password) {
			this.setState({
				password: { error: "Please provide a password" }
			})
		}
		if(!kentID.includes("@kent.ac.uk")){
			kentID += "@kent.ac.uk";
			console.log("Add email extension")
		}
		if(kentID && password) {
			console.log("Submitting form...");
			this.setState({ loading: true });

			this.registerUser({ email: kentID, password })
				.then(data => {
					// Redirect user to verify account
					this.setState({ redirect: kentID });
				})
				/* TODO: Process errors */
				.catch(error => {
					console.error(error);
					this.setState({ loading: false, error })
				});
		}
	}
	
	registerUser = (data = {}) => {
		return fetch("https://kentflix-7f510.firebaseapp.com/api/v1/signup", {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			redirect: "follow",
			referrer: "no-referrer",
			body: JSON.stringify(data),
		}).then(response => response.json());
	}

	render() {
		const { kentID, password, loading, redirect, error } = this.state;

		if(redirect) {
			return (
				<Redirect to={{
					pathname: "/verify/",
					state: { email: redirect }
				}} />
			)
		}

		return (
			<div className="row">
				<div className="
					col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3
				">
					<form onSubmit={this.submit()} autoComplete="off">
						<legend><h1 className="form-header">Register</h1></legend>
						<div className="input-group vertical">
							<label htmlFor="kentID">
								Kent ID
								{ kentID.error && (
									<mark className="secondary">{kentID.error}</mark>
								)}
							</label>
							<input
								onChange={this.handleChange("kentID")}
								value={kentID.value || ''}
								type="text"
								id="kentID"
								name="kentID"
								placeholder="ABC123"
								disabled={loading}
								autoFocus
							/>
						</div>
						<div className="input-group vertical">
							<label htmlFor="password">
								Password
								{ password.error && (
									<mark className="secondary">{password.error}</mark>
								)}
							</label>
							<input
								onChange={this.handleChange("password")}
								value={password.value || ''}
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								disabled={loading}
							/>
						</div>
						<div className="btn-container">
							{ loading && (
								<div className="loading">
									<div className="spinner primary"></div>
								</div>
							)}
							{ error && (
								<mark className="secondary">{error}</mark>
							)}
							<div className="button-group btn-group">
								<button
									className="primary shadowed btn-1"
									type="submit"
									disabled={loading}>
									Register
								</button>
								<Link
									className="button shadowed btn-1"
									to={loading ? "#" : "/login/"}
									disabled={loading}
								>
									Login
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Register;
