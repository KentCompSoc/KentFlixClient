import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => rest.token ? (
			<Component token={rest.token} {...props} />
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

export default PrivateRoute;