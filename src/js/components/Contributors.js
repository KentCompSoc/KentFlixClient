// React
import React from 'react';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
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
const Contributors = props => {
	const { type, contributors, classes } = props;
	if (contributors.loading) {
		return (
			<Grid item xs={6}>
				<Typography variant="body1" color="inherit">{type} side:</Typography>
				<div className={classes.center}>
					<CircularProgress />
				</div>
			</Grid>
		)
	}

	if (contributors.error) {
		return (
			<Grid item xs={6}>
				<Typography variant="body1" color="inherit">{type} side:</Typography>
				<Typography variant="body1" color="inherit">
					Couldn't fetch {type.toLowerCase()} contributors
				</Typography>
			</Grid>
		)
	}

	return (
		<Grid item xs={6}>
			<Grid container spacing={8}>
				<Grid item xs={12}>
					<Typography variant="body1" color="inherit">{type} side:</Typography>
				</Grid>
				<Grid item xs={12}>
					{ contributors.data.length > 0 ? (contributors.data.map(user => (
							<Avatar
								key={user.id}
								component="a"
								href={user.html_url}
								alt={user.login + "avatar"}
								src={user.avatar_url}
								className={classes.avatar}
							/>
					))) : (
						<Typography variant="body1" color="inherit">
							{contributors.data.message}
						</Typography>
					)}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default withStyles(styles)(Contributors);
