// React
import React from 'react';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// Styles
const styles = {
	root: {
		padding: 8,
	},
	link: {
		color: "white"
	}
};
const Contributors = props => {
	const { type, contributors } = props;
	if (contributors.loading) {
		return (
			<Grid item xs={6}>
				<Typography variant="body1" color="inherit">{type} side:</Typography>
				<div className="loading">
					<div className="spinner primary"></div>
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
			{ contributors.data.length > 0 ? (contributors.data.map(user => (
				<Grid key={user.id} item xs={3} md={1}>
					<Avatar
						component="a"
						href={user.html_url}
						alt={user.login + "avatar"}
						src={user.avatar_url}
					/>
				</Grid>
			))) : (
				<Typography variant="body1" color="inherit">
					{contributors.data.message}
				</Typography>
			)}
			</Grid>
		</Grid>
	)
}

export default withStyles(styles)(Contributors);
