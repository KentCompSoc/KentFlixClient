import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
		event.preventDefault();
		if(!this.state.kentID.value) {
			this.setState({
				kentID: { message: "Please provide a KentID" }
			})
		}
		if(!this.state.password.value) {
			this.setState({
				password: { message: "Please provide a password" }
			})
		}

		if(this.state.kentID.value && this.state.password.value) {
			console.log("Submitting form...");
			this.setState({ loading: true })
		}
	}
	render() {
		const { kentID, password, loading } = this.state;
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
