import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
	registerBtn: {
		flex: 1,
		marginRight: 5,
		marginTop: 5,
	},
	loginBtn: {
		flex: 1,
		marginLeft: 5,
		marginTop: 5,
	},
	error: {
		borderColor: theme.palette.error.main
	}
});

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
		return fetch("https://api.kentflix.com/v1/signup", {
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
		const { classes } = this.props;

		if(redirect) {
			return (
				<Redirect to={{
					pathname: "/verify/",
					state: { email: redirect }
				}} />
			)
		}

		return (
			<div className={classes.root}>
				<Grid container justify="center" spacing={8}>
					<Grid item xs={12} md={8} lg={6}>
						<Card>
							<CardContent>
								<form onSubmit={this.submit()} autoComplete="off">
									<legend>
										<Typography variant="h2" gutterBottom>Register</Typography>
									</legend>
									<Typography variant="body1">
										Please use your Kent Username (student email) but use a new
										password
									</Typography>
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
									<Typography
										variant="body1"
										className={classes.center}
										gutterBottom
									>
										By clicking "Register", you agree to the Terms and
										<Button
											href="https://github.com/KentCompSoc/KentFlixClient/blob/master/policies/privacy_policy.md"
											target="_blank"
										>
											Privacy Policy
										</Button>
									</Typography>
									<div className={classes.btnContainer}>
										<Button
											variant="contained"
											color="primary"
											type="submit"
											disabled={loading}
											className={classes.registerBtn}
										>
											Register
										</Button>
										<Button
											variant="contained"
											color="secondary"
											type="submit"
											component={Link}
											to={loading ? "#" : "/login/"}
											disabled={loading}
											className={classes.loginBtn}
										>
											Login
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

export default withStyles(styles)(Register);