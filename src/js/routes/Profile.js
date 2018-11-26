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
const Profile = props => {
		const { classes } = props;
		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<Typography variant="h2" gutterBottom>Profile</Typography>
					</Grid>
				</Grid>
			</div>
		)
	}

export default withStyles(styles)(Profile)

