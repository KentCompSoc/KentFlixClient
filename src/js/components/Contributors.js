// React
import React, { PureComponent } from "react";
// Material-UI
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
// Styles
const styles = {
	center: {
		textAlign: "center"
	},
	avatar: {
		margin: 2,
		display: "inline-block"
	}
};

class Contributors extends PureComponent {
	state = {
		loading: true,
		error: false,
		contributors: []
	};

	componentDidMount() {
		const clientRef =
			"https://api.github.com/repos/KentCompSoc/KentFlixClient/contributors?q=contributions&order=desc";
		const serverRef =
			"https://api.github.com/repos/KentCompSoc/KentFlixServer/contributors?q=contributions&order=desc";
		// Fetch
		Promise.all([fetch(clientRef), fetch(serverRef)])
			.then(response => {
				response.forEach(result => {
					result.json().then(data => {
						const newContributors = data.map(c => {
							return {
								id: c.id,
								href: c.html_url,
								name: c.login,
								image: c.avatar_url,
								contributions: c.contributions
							};
						});
						this.setState(state => ({
							contributors: [...state.contributors, ...newContributors]
						}));
					});
				});
				this.setState({ loading: false });
			})
			.catch(error => {
				console.error(error);
				this.setState({ error, loading: false });
			});
	}

	render() {
		const { loading, error, contributors } = this.state;
		const { classes } = this.props;

		if (loading) {
			return (
				<div className={classes.center}>
					<LinearProgress color="secondary" variant="query" />
				</div>
			);
		}

		if (error) {
			return (
				<Typography variant="body1" color="inherit">
					Couldn't fetch contributors
				</Typography>
			);
		}

		return (
			<Grid container spacing={8}>
				{console.log(
					contributors.sort((a, b) => {
						return a.contributions + b.contributions;
					})
				)}
				{contributors
					.sort((a, b) => {
						return a.contributions + b.contributions;
					})
					.map(user => (
						<Avatar
							key={user.id}
							component="a"
							href={user.href}
							alt={user.name + "avatar"}
							src={user.image}
							className={classes.avatar}
						/>
					))}
			</Grid>
		);
	}
}

export default withStyles(styles)(Contributors);
