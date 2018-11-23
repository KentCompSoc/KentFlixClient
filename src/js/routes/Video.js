import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Video.css";
//Redux
import { connect } from "react-redux";
import { getLectureById } from "../actions/lectures";

/**
 * Displays a video.
 */
class Video extends Component {
	state = {
		currentTime: 0,
	}
	componentDidMount() {
		const { token } = this.props;
		const { lecture } = this.props.match.params;
		this.props.getLectureById({ token, lectureID: lecture.replace(/-/g, ".") });
	}

	/**
	 * Updates the video play time.
	 */
	updateCurrentTime = () => event => {
		const currentTime = document.getElementById("video").currentTime;
		this.setState({ currentTime });
	}
	render() {
		//const { year, course, videoURI } = this.props.match.params;
		const { currentTime } = this.state;
		const { lecture, error } = this.props;
		const id = this.props.match.params.lecture;


		if (error && error.message) {
			return (
				<div className="row">
					<div className="col-sm-12"><h2>Error</h2></div>
					<div className="col-sm-12">
						<h3><mark className="secondary">{error.message}</mark></h3>
					</div>
				</div>
			)
		}

		return (
			<div className="row">
				<div className="col-sm-12">
					<h3>
						{lecture ? lecture.title : "Loading..."}
						<small>
							Back to <Link to={"/module/" + id.slice(0, id.indexOf('-'))}>
								{id.slice(0, id.indexOf('-'))}
							</Link>
						</small>
					</h3>
				</div>
				<div className="col-sm-12">
					{lecture ? (
						<React.Fragment>
							<video
								className="video-video"
								id="video"
								onTimeUpdate={this.updateCurrentTime()}
								controls
							>
								<source src={lecture.videoURL} type="video/mp4" />
							</video>
						
							<progress
								className="video-progress"
								value={currentTime}
								max={lecture.duration}
							></progress>
							<h4>
								{lecture.title} - {lecture.author}
								<small>{new Date(lecture.date).toUTCString()}</small>
							</h4>
						</React.Fragment>
					) : (
						<div className="loading">
							<div className="spinner primary"></div>
						</div>
					)}
				</div>
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
		error
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
)(Video)
