import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Form.css';

class Login extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
					<form>
						<legend><h1>Login</h1></legend>
						<div className="container">
							<div className="row input-group fluid">
								<label className="col-sm-12" htmlFor="kentID" >Kent ID</label>
								<input className="col-sm-12" type="text" id="kentID" placeholder="ABC123" />
							</div>
						</div>
						<div className="container">
							<div className="row input-group fluid">
								<label className="col-sm-12" htmlFor="password">Password</label>
								<input className="col-sm-12" type="password" id="password" placeholder="Password" />
							</div>
						</div>
						<div className="container btn-container">
							<div className="row button-group">
								<button className="primary shadowed" type="submit">Login</button>
								<Link className="button shadowed" to="/sign-up/">Sign up</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
