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
					<form onSubmit={this.submit()}>
						<legend><h1>Login</h1></legend>
						<div className="container">
							<div className="row input-group fluid">
								<label className="col-sm-12" htmlFor="kentID">
									Kent ID
									{ kentID.message && (
										<mark className="secondary">{kentID.message}</mark>
									)}
								</label>
								<input
									className="col-sm-12"
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
						</div>
						<div className="container">
							<div className="row input-group fluid">
								<label className="col-sm-12" htmlFor="password">
									Password
									{ password.message && (
										<mark className="secondary">{password.message}</mark>
									)}
								</label>
								<input
									className="col-sm-12"
									onChange={this.handleChange("password")}
									value={password.value || ''}
									type="password"
									id="password"
									name="password"
									placeholder="Password"
									disabled={loading}
								/>
							</div>
						</div>
						<div className="container btn-container">
							{ loading && (
								<div className="loading">
									<div className="spinner primary"></div>
								</div>
							)}
							<div className="row button-group">
								<button
									className="primary shadowed"
									type="submit"
									disabled={loading}>
									Login
								</button>
								<Link
									className="button shadowed"
									to={loading ? "#" : "/sign-up/"}
									disabled={loading}
								>
									Sign up
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
