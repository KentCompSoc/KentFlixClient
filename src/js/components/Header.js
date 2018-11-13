import React from "react";
import "../../css/App.css";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { clearToken } from "../actions/user";

const Header = (props) => {
	const { token, clearToken } = props;
	return (
		<header className="sticky">
		<span className="header-11">
			<Link to="/dashboard/" className="logo">Logo</Link>
			<Link to="/dashboard/" className="button">Dashboard</Link>
		</span>
		{ token ? (
			<div className="button header-1" onClick={clearToken}>
				Logout
			</div>
		) : (
			<Link to="/login/" className="button header-1">Login</Link>
		)}
		</header>
	)
};

function mapStateToProps ({ user }) {
	return {
		token: Boolean(user.token)
	}
}

function mapDispatchToProps (dispatch) {
	return {
		clearToken: (data) => dispatch(clearToken(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(Header)