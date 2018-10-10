import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Course.css";

// Test videos
import videos from "../testVideos.json"

class Course extends Component {
	render() {
		const { year, course } = this.props.match.params;
		if (year !== "2018" || course !== "CO510") {
			return (
				<div className="row">
					<h3>
						Couldn't find that course
						<small>
							Why not <Link to="/submit-a-course/">submit</Link> the course?
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
						<small>{videos.video.length} videos available to watch</small>
					</h3>
				</div>
				{videos.video.sort((x, y) => new Date(y.publish) - new Date(x.publish))
					.map(v => (
						<div className="col-sm-12 col-md-4 col-lg-3" key={v.publish}>
							<div className="card fluid">
								<img
									src="image.png"
									className="section media"
									alt={v.title + " video image"}
								/>
								<progress
									className="video-progress"
									value={v.progress}
									max={v.duration}
								></progress>
								<h4>
									{v.title} - {v.author}
									<small>{new Date(v.publish).toUTCString()}</small>
								</h4>
								<div className="button-group">
									<Link
										to={
											v.title.toLowerCase().replace(" ", "-")
												.replace(/[^a-z-0-9]/g, "")
										}
										className="button video-btn-1"
									>
										View
									</Link>
									<button className="video-btn-1">Watch later</button>
								</div>
							</div>
						</div>
					))}
			</div>
		)
	}
}

export default Course;
