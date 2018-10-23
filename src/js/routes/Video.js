import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Video.css";

/**
 * Displays a video.
 */
class Video extends Component {
	state = {
		currentTime: 0,
		video: null,
		loading: true,
	}

	componentDidMount() {
		// TODO: Get video via API

		if(this.props.location.state) {
			this.setState({ video: this.props.location.state, loading: false })
		} else {
			this.setState({ error: true, loading: false })
		}
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
		const { currentTime, video, loading } = this.state;

		if(loading) {
			return (
				<div className="loading">
					<div className="spinner primary"></div>
				</div>
			)
		}

		/* if () {
			return (
				<div className="row">
					<h3>
						Couldn't find that video or the course
						<small>
							Why not <Link to="/submit-a-course/">submit</Link> the course?
						</small>
					</h3>
				</div>
			)
		} */
	
		/* if () {
			return (
				<div className="row">
					<h3>
						Couldn't find that video but found the course
						<small>
							Report a <Link to="/report-a-broken-link/">broken</Link> link?
						</small>
					</h3>
				</div>
			)
		} */

		return (
			<div className="row">
				<div className="col-sm-12">
					<h3>
						{video.title}
						<small>Back to <Link to="./">course</Link></small>
					</h3>
				</div>
				<div className="col-sm-12">
					<video
						className="video-video"
						id="video"
						onTimeUpdate={this.updateCurrentTime()}
						controls
					>
						<source src={video.videoURL} type="video/mp4" />
					</video>
					<progress
						className="video-progress"
						value={currentTime}
						max={video.videoLength}
					></progress>
					<h4>
						{video.title} - {video.author}
						<small>{new Date(video.date).toUTCString()}</small>
					</h4>
				</div>
			</div>
		)
	}
}

export default Video;
