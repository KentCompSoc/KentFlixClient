import React from "react";
import { Route, Redirect } from "react-router-dom";
//Redux
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => rest.token ? (
			<Component {...props} />
		) : (
			<Redirect
				to={{
					pathname: "/login/",
					state: { from: props.location }
				}}
			/>
		)}
	/>
);

function mapStateToProps ({ user }) {
	return {
		token: Boolean(user.token)
	}
}

export default connect(
	mapStateToProps
)(PrivateRoute)
