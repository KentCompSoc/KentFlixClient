// React
import React from 'react';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// Styles
const styles = {
	root: {
		padding: 5,
	},
};
const NotFound = props => {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<Grid container spacing={8}>
				<Grid item xs={12}>
					<Typography variant="h2" gutterBottom>
						Couldn't find that page
					</Typography>
					<Button
						variant="outlined"
						href="https://github.com/KentCompSoc/KentFlixClient/issues/new?template=bug_report.md"
					>
						Report a bug
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default withStyles(styles)(NotFound)