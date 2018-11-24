// React
import React, { Component } from 'react';
// Router
import { Link } from 'react-router-dom';
// Components
import Contributors from './Contributors';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// Styles
const styles = {
	root: {
		padding: 8,
	},
	link: {
		color: "white"
	}
};
class Footer extends Component {
	state = {
		clientContributors: {
			loading: true,
			data: null,
			error: null,
		},
		serverContributors: {
			loading: true,
			data: null,
			error: null,
		}
	}

	componentDidMount() {
		// Client
		fetch("https://api.github.com/repos/KentCompSoc/KentFlixClient/contributors?q=contributions&order=desc")
			.then(res => res.json())
			.then(result => {
				this.setState({
					clientContributors: {
						loading: false,
						data: result,
					}
				});
			})
			.catch(error => {
				this.setState({
					clientContributors: {
						loading: false,
						error,
					}
				});
			})

		// Server
		fetch("https://api.github.com/repos/KentCompSoc/KentFlixServer/contributors?q=contributions&order=desc")
			.then(res => res.json())
			.then(result => {
				this.setState({
					serverContributors: {
						loading: false,
						data: result,
					}
				});
			})
			.catch(error => {
				this.setState({
					serverContributors: {
						loading: false,
						error,
					}
				});
			})
	}

	render() {
		const { clientContributors, serverContributors } = this.state;
		const { classes } = this.props;

		return (
			<AppBar component="footer" position="static" >
				<Toolbar>
					<Grid container spacing={8} className={classes.root}>
						<Grid item xs={12}>
							<Typography variant="body1" color="inherit">
								Made with <i className="far fa-heart" title="love" aria-hidden>
								</i> <span className="sr-only">love</span> by students for
								students
							</Typography>
						</Grid>
						<Grid item xs={12}><Divider /></Grid>
						<Grid item xs={6}>
							<Typography variant="body1">
								<Link className={classes.link} to="/about/">About</Link>
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="body1">
								<a
									className={classes.link}
									href="https://github.com/KentCompSoc/KentFlixClient/issues/new/choose/"
								>
									Contact us
								</a>
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="body1">
								<a
									className={classes.link}
									href="https://github.com/KentCompSoc/KentFlixClient/issues/new?template=bug_report.md"
								>
									Report a bug
								</a>
							</Typography>
						</Grid>
						<Grid item xs={12}><Divider /></Grid>
						<Grid item xs={12}>
							<a
								className="icon-link"
								href="https://github.com/KentCompSoc/KentFlixClient/"
							>
								<i
									className="fab fa-github"
									title="GitHub link"
									aria-hidden
								></i>
								<span className="sr-only">GitHub link</span>
							</a>
							<a
								className="icon-link"
								href="https://www.facebook.com/groups/kentcomputingsociety/"
							>
								<i
									className="fab fa-facebook-square"
									title="Facebook link"
									aria-hidden
								></i>
								<span className="sr-only">Facebook link</span>
							</a>
						</Grid>
						<Grid item xs={12}><Divider /></Grid>
						<Grid item xs={12}>
							<Typography variant="body1" color="inherit">
								Top contributors
							</Typography>
						</Grid>
						<Contributors type="Client" contributors={clientContributors} />
						<Contributors type="Server" contributors={serverContributors} />
					</Grid>
				</Toolbar>
			</AppBar>
		)
	}
};

export default withStyles(styles)(Footer);
