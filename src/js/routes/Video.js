import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Video.css";

// Test videos
import videos from "../testVideos.json"

/**
 * Displays a video.
 */
class Video extends Component {
	state = {
		currentTime: 0,
	}

	/**
	 * Updates the video play time.
	 */
	updateCurrentTime = () => event => {
		const currentTime = document.getElementById("video").currentTime;
		this.setState({ currentTime });
	}
	render() {
		const { year, course, video } = this.props.match.params;
		const { currentTime } = this.state;
		if (year !== "2018" || course !== "CO510") {
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
		}

		let tempVideo = videos.video.filter(v => {
			return v.title.toLowerCase().replace(" ", "-")
				.replace(/[^a-z-0-9]/g, "") === video;
		})[0];

		if (!tempVideo) {
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
		}
		return (
			<div className="row">
				<div className="col-sm-12">
					<img src={videos.image} alt={videos.title + " course image"} />
				</div>
				<div className="col-sm-12">
					<h3>
						{videos.title}
						<small>Back to <Link to="/">course</Link></small>
					</h3>
				</div>
				<div className="col-sm-12">
					<video
						className="video-video"
						id="video"
						onTimeUpdate={this.updateCurrentTime()}
						controls
					>
						<source src={tempVideo.src} type="video/mp4" />
					</video>
					<progress
						className="video-progress"
						value={currentTime}
						max={tempVideo.duration}
					></progress>
					<h4>
						{tempVideo.title} - {tempVideo.author}
						<small>{new Date(tempVideo.publish).toUTCString()}</small>
					</h4>
				</div>
			</div>
		)
	}
}

export default Video;
