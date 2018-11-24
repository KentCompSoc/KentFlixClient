// React
import React, { Component } from "react";
// Router
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getCourseModulesByCourseId } from "../actions/modules";
import { getCourseById } from "../actions/courses";
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
// Styles
const styles = theme => ({
	root: {
		padding: 5,
	},
	center: {
		textAlign: "center",
	},
});
class Course extends Component {
	componentDidMount() {
		const { token } = this.props;
		const { course } = this.props.match.params;
		this.props.getCourseModulesByCourseId({ token, courseID: course });
		this.props.getCourseById({ token, courseID: course });
	}

	render() {
		const courseID = this.props.match.params.course;
		const { error, modules, schoolID, schoolName, name, classes } = this.props;
		const years = [3, 2, 1];

		if (error && error.message) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<h2>{courseID}</h2>
					</div>
					<div className="col-sm-12">
						<h3><mark className="secondary">{error.message}</mark></h3>
					</div>
				</div>
			)
		}

		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<Typography variant="h2">
							{courseID} - {name}
						</Typography>
						<Typography variant="body1" gutterBottom>
							Back to <Link to={"/school/" + schoolID}>{
								schoolName ? schoolName : "school"
							}</Link>
						</Typography>
					</Grid>
					{ modules ? years.map(y => (
						<React.Fragment key={y}>
							<Grid item xs={12}>
								<Typography variant="h4" gutterBottom>Stage {y}</Typography>
							</Grid>
							{
								Object.keys(modules).filter(key => modules[key].stage === y)
									.length !== 0 ? (
									Object.keys(modules).filter(key => modules[key].stage === y)
										.map(key => (
										<Grid
											key={key}
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
												to={"/module/"+key}
											>
												{key} - {modules[key].name}
											</Button>
										</Grid>
									))
								) : (
									<Grid item xs={12}>
										<Typography variant="body1" gutterBottom>
											No modules found for stage {y}
										</Typography>
									</Grid>
								)
							} {
								y !== 1 && (
									<Grid item xs={12}><Divider /></Grid>
								)
							}
						</React.Fragment>
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

function mapStateToProps (
		{ user, schools, courses, modules, error },
		ownProps
	) {
	const courseID = ownProps.match.params.course;
	let schoolID, schoolName, name = null
	const schoolKey = Object.keys(courses)
		.filter(key => courses[key][courseID] !== null)[0];
	if(schoolKey) {
		schoolID = schoolKey;
		name = courses[schoolKey][courseID].name;
		if(schools[schoolKey]) {
			schoolName = schools[schoolKey].name;
		}
	}
	return {
		token: user.token,
		course: courses[courseID],
		modules: modules[courseID],
		name,
		schoolID,
		schoolName,
		error
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getCourseModulesByCourseId: (data) => dispatch(
			getCourseModulesByCourseId(data)
		),
		getCourseById: (data) => dispatch(getCourseById(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
	)(withStyles(styles)(Course))
