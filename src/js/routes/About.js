// React
import React from 'react';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Styles
const styles = {
	root: {
		padding: 5,
	},
};
const About = props => {
		const { classes } = props;
		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<Typography variant="h2" gutterBottom>About</Typography>
						<Typography variant="body1">
							Kent Flix Client is a progressive web application using React.js
							on the frontend and interacting with a <a
								href="https://github.com/KentCompSoc/KentFlixServer/"
							>
								restful api
							</a>.
						</Typography>
						<Typography variant="body1">
							The project is fully open source and any contributions are welcome
							on the <a href="https://github.com/KentCompSoc/KentFlixClient/">
								GitHub repository
							</a>.
						</Typography>
					</Grid>
				</Grid>
			</div>
		)
	}

export default withStyles(styles)(About)

