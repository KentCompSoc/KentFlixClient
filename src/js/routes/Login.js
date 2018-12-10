import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
//Redux
import { connect } from "react-redux";
import { login } from "../actions/user";
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
// Styles
const styles = theme => ({
	root: {
		padding: 5,
	},
	center: {
		textAlign: 'center'
	},
	btnContainer: {
		display: 'flex',
	},
	loginBtn: {
		flex: 1,
		marginRight: 5,
		marginTop: 5,
	},
	registerBtn: {
		flex: 1,
		marginLeft: 5,
		marginTop: 5,
	},
	error: {
		borderColor: theme.palette.error.main
	}
});
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
		loading: false
	};

	handleChange = type => event => {
		this.setState({
			[type]: { value: event.target.value }
		});
	};

	submit = () => event => {
		this.setState({ loading: true })
		let kentID = this.state.kentID.value;
		const password = this.state.password.value;

		event.preventDefault();
		if(!kentID) {
			this.setState({
				kentID: { message: "Please provide a KentID" },
				loading: false
			})
		}
		if(!password) {
			this.setState({
				password: { message: "Please provide a password" },
				loading: false
			})
		}

		if (!kentID.includes("@kent.ac.uk")) {
			kentID += "@kent.ac.uk";
			console.log("Add email extension")
		}

		if(kentID && password) {
			console.log("Submitting form...");
			this.props.login({ email: kentID, password});
		}
	}

	componentDidUpdate(prevProps) {
		const { error } = this.props;
		if(error !== prevProps.error && error) {
			this.setState({ loading: false })
		}
	}

	render() {
		const { from } = this.props.location.state || { from: {
			pathname: "/dashboard/"
		}};
		const { kentID, password, loading } = this.state;
		const { token, error, classes } = this.props;

		if (token) {
			return <Redirect to={from} />;
		}
		return (
			<div className={classes.root}>
				<Grid container justify="center" spacing={8}>
					<Grid item xs={12} md={8} lg={6}>
						<Card>
							<CardContent>
								<form onSubmit={this.submit()} autoComplete="on">
									<legend>
										<Typography variant="h2" gutterBottom>Login</Typography>
									</legend>
									<TextField
										required
										id="kentID"
										label="Kent ID"
										margin="normal"
										onChange={this.handleChange("kentID")}
										value={kentID.value || ''}
										fullWidth
										disabled={loading}
									/>
									<TextField
										required
										id="password"
										label="Password"
										margin="normal"
										onChange={this.handleChange("password")}
										value={password.value || ''}
										fullWidth
										type="password"
										disabled={loading}
									/>
									<div className={classes.btnContainer}>
										<Button
											variant="contained"
											color="primary"
											type="submit"
											disabled={loading}
											className={classes.loginBtn}
										>
											Login
										</Button>
										<Button
											variant="contained"
											color="secondary"
											type="submit"
											component={Link}
											to={loading ? "#" : "/register/"}
											disabled={loading}
											className={classes.registerBtn}
										>
											Register
										</Button>
									</div>
									<br />
									<div className={classes.center}>
										{ loading && <CircularProgress /> }
										{error && (
											<Chip
												label={error}
												className={classes.error}
												variant="outlined"
											/>
										)}
									</div>
								</form>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps ({ user, error }) {
	return {
		token: Boolean(user.token),
		error: error.message,
	}
}

function mapDispatchToProps (dispatch) {
	return {
		login: (data) => dispatch(login(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login))
