// React
import React, { Component } from 'react';
// Router
import { Link } from 'react-router-dom';
// Redux
import { connect } from "react-redux";
import { getSchools } from "../actions/schools";
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
// Styles
const styles = {
	root: {
		padding: 5,
		flexGrow: 1,
	},
	center: {
		textAlign: "center",
	},
};
class Dashboard extends Component {
	componentDidMount() {
		this.props.getSchools({token: this.props.token});
	}

	render() {
		const { error, schools, classes } = this.props;

		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<Typography variant="h2" gutterBottom>Schools</Typography>
					</Grid>
					{ error ? (
						<Grid item xs={12}>
							<Typography variant="p">Error: { error }</Typography>
						</Grid>
					) : schools ? (
						<Grid item xs={12}>
							<Grid container spacing={8}>
								{ schools.length === 0 ? (
									<Grid item xs={12}>No schools found</Grid>
								) : Object.keys(schools).map(id => (
									<Grid
										key={id}
										item
										xs={12}
										sm={4}
										md={3}
										lg={2}
										className={classes.center}
									>
										<Button
											variant="outlined"
											component={Link}
											to={"/school/"+id}
										>
											{schools[id].name}
										</Button>
									</Grid>
								))}
							</Grid>
						</Grid>
					) : (
						<Grid item xs={12} className={classes.center}>
							<CircularProgress />
						</Grid>
					)}
				</Grid>
			</div>
		)
	}
}

function mapStateToProps ({ user, schools, error }) {
	return {
		token: user.token,
		schools,
		error: error.message
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getSchools: (data) => dispatch(getSchools(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard))

