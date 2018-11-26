// React
import React, { Component } from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { getLectureById } from "../actions/lectures";
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// Styles
const styles = {
	root: {
		padding: 5,
	},
	center: {
		textAlign: "center",
	},
	video: {
		width: '100%',
		maxHeight: '80vh'
	}
};
/**
 * Displays a video.
 */
class Lecture extends Component {
	state = {
		currentTime: 0,
	}
	componentDidMount() {
		const { token } = this.props;
		const { lecture } = this.props.match.params;
		this.props.getLectureById({ token, lectureID: lecture.replace(/-/g, ".") });
	}

	render() {
		const { lecture, error, classes } = this.props;
		const id = this.props.match.params.lecture;

		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<Typography variant="h2">
							{lecture ? lecture.title : "Loading..."}
						</Typography>
						<Typography variant="body1">
							Back to <Link to={"/module/" + id.slice(0, id.indexOf('-'))}>
								{id.slice(0, id.indexOf('-'))}
							</Link>
						</Typography>
					</Grid>
					{ error ? (
						<Grid item xs={12}>
							<Typography variant="p">Error: { error }</Typography>
						</Grid>
					) : lecture ? (
						<Grid item xs={12}>
							<video
								className={classes.video}
								id="video"
								controls
							>
								<source src={lecture.videoURL} type="video/mp4" />
							</video>
							<Typography variant="h4">
								{lecture.title} - {lecture.author}
							</Typography>
							<Typography variant="body1">
								{new Date(lecture.date).toUTCString()}
							</Typography>
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

function mapStateToProps ({ user, lectures, error }, ownProps) {
	const id = ownProps.match.params.lecture.replace(/-/g, ".");
	const courseID = id.slice(0, id.indexOf('.'));
	let lecture = null;

	if(lectures[courseID] && lectures[courseID][id]) {
		lecture = lectures[courseID][id];
	}

	return {
		token: user.token,
		lecture,
		error: error.message
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getLectureById: (data) => dispatch(getLectureById(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Lecture))
