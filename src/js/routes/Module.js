// React
import React, { Component } from "react";
// Router
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getLecturesByModuleID } from "../actions/lectures";
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
// Styles
const styles = {
	root: {
		padding: 5,
	},
	center: {
		textAlign: "center",
	},
	media: {
		objectFit: 'cover',
	},
};
class Module extends Component {
	componentDidMount() {
		const { token } = this.props;
		const { module } = this.props.match.params;
		this.props.getLecturesByModuleID({ token, moduleID: module });
	}

	render() {
		const moduleID = this.props.match.params.module;
		const { error, name, courseID, courseName, classes } = this.props;
		let { lectures } = this.props;
		if(lectures) {
			lectures = Object.values(lectures)
				.sort((a, b) => new Date(b.date) - new Date(a.date));
		}

		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<Typography variant="h2">{moduleID} - {name}</Typography>
						{ courseID && (
							<Typography variant="body1">
								Back to <Link to={"/course/" + courseID}>{
									courseName ? courseName : "course"
								}</Link>
							</Typography>
						)}
						<Typography variant="body1" gutterBottom>
							{ lectures ? Object.keys(lectures).length : "..."} videos
								available to watch
						</Typography>
					</Grid>
					{ error ? (
						<Grid item xs={12}>
							<Typography variant="p">Error: { error }</Typography>
						</Grid>
					) : lectures ? Object.keys(lectures).map(key => (
						<Grid
								key={key}
								item
								xs={12}
								sm={4}
								md={3}
								lg={2}
								className={classes.center}
							>
							<Card>
								<CardActionArea
									component={Link}
									to={"/lecture/"+lectures[key].lectureID.replace(/\./g, "-")}
								>
									<CardMedia
										component="video"
										className={classes.media}
										src={lectures[key].videoURL + "#0.1"}
										alt={lectures[key].title + " video image"}
									/>
									<CardContent>
										<Typography variant="h6">
											{lectures[key].title} - {lectures[key].author}
										</Typography>
										<Typography variant="body1">
											{new Date(lectures[key].date).toUTCString()}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
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

function mapStateToProps ({ user, modules, lectures, error }, ownProps) {
	const moduleID = ownProps.match.params.module;
	let name, courseID  = null;
	let videos = lectures[moduleID] ? lectures[moduleID] : null;

	if(videos) {
		name = videos.name;

		delete videos.name;
		delete videos.moduleID;
		delete videos.stage;
		delete videos.term;
	}

	const courseKey = Object.keys(modules)
		.filter(key => modules[key][moduleID] !== null)[0];
	if(courseKey) {
		courseID = courseKey;
	}

	return {
		token: user.token,
		name,
		courseID,
		lectures: videos,
		error: error.message
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getLecturesByModuleID: (data) => dispatch(getLecturesByModuleID(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Module))
