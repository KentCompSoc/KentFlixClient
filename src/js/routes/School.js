import React, { Component } from "react";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getCoursesBySchoolID } from "../actions/courses";
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
	},
	center: {
		textAlign: "center",
	},
};
/**
 * Displays the school modules and courses
 * @param {string} school The school id
 */
class School extends Component {
	componentDidMount() {
		const { token } = this.props;
		const { school } = this.props.match.params;
		this.props.getCoursesBySchoolID({ token, schoolID: school });
	}

	render() {
		const { school, courses, error, classes } = this.props;
		const schoolID = this.props.match.params.school;

		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<Typography variant="h2" gutterBottom>
							{school && school.name ? school.name : schoolID}
						</Typography>
					</Grid>
					{ error ? (
						<Grid item xs={12}>
							<Typography variant="p">Error: { error }</Typography>
						</Grid>
					) : courses ? Object.keys(courses).map(c => (
						<Grid
							key={c}
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
								to={"/course/"+c}
							>
								{c} - {courses[c].name}
							</Button>
						</Grid>
					)) : (
						<Grid item xs={12} className={classes.center}>
							<CircularProgress />
						</Grid>
					)}
				</Grid>
			</div>
		)
	}
}

function mapStateToProps ({ user, schools, courses, error }, ownProps) {
	const schoolID = ownProps.match.params.school;

	return {
		token: user.token,
		school: schools[schoolID],
		courses: courses[schoolID],
		error: error.message
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getCoursesBySchoolID: (data) => dispatch(getCoursesBySchoolID(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(School))
