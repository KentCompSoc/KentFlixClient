import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../css/Form.css';

class Login extends Component {
	state = {
		kentID: {
			value: '',
			error: '',
		},
		password: {
			value: '',
			error: '',
		},
		message: null,
		fail: false,
		loading: false,
		success: false
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
		this.setState({ error: null })
		if(!kentID) {
			this.setState({
				kentID: { message: "Please provide a KentID" }
			})
		}
		if(!password) {
			this.setState({
				password: { message: "Please provide a password" }
			})
		}

		if (!kentID.includes("@kent.ac.uk")) {
			kentID += "@kent.ac.uk";
			console.log("Add email extension")
		}

		if(kentID && password) {
			console.log("Submitting form...");
			this.setState({ loading: true })
			this.submitLogin({ email: kentID, password }).then(data => {
				/* FIXME: Server should respond with error status */
				if(data.error) {
					console.error(data.infoMessage);
					this.setState({
						loading: false,
						error: data.infoMessage
					})
					return;
				}

				console.log(data.sessionID)
				// Set token
				this.props.setToken(data.sessionID);
				// Redirect user to dashboard
				return (
					<Redirect to={{
						path: "/dashboard/"
					}} />
				)
			})
				/* TODO: Process errors */
				.catch(error => {
					console.error(error);
					this.setState({ loading: false })
				});
		}
	}

	/**
	 * Sends a login request
	 * @param {object} data The data to be uploaded
	 * @returns {promise} Returns a promise from the request
	 */
	submitLogin = (data = {}) => {
		return fetch("https://kentflix-7f510.firebaseapp.com/api/v1/login", {
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
		const { from } = this.props.location.state || { from: { pathname: "/" } };
		const { kentID, password, loading, error } = this.state;
		const { token } = this.props;

		if (token) {
			return <Redirect to={from} />;
		}
		return (
			<div className="row">
				<div className="
					col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3
				">
					<form onSubmit={this.submit()} autoComplete="on">
						<legend><h1 className="form-header">Login</h1></legend>
						<div className="input-group vertical">
							<label htmlFor="kentID">
								Kent ID
								{ kentID.message && (
									<mark className="secondary">{kentID.message}</mark>
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
								{ password.message && (
									<mark className="secondary">{password.message}</mark>
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
							{error && (
								<mark className="secondary">
									{error}
								</mark>
							)}
							<div className="button-group btn-group">
								<button
									className="primary shadowed btn-1"
									type="submit"
									disabled={loading}>
									Login
								</button>
								<Link
									className="button shadowed btn-1"
									to={loading ? "#" : "/register/"}
									disabled={loading}
								>
									Register
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
