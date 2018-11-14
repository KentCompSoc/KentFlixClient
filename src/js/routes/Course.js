import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Course.css";

class Course extends Component {
	state = {
		course: null,
		loading: true,
		error: false,
	}

	componentDidMount() {
		const { course } = this.props.match.params;
		this.getCourse(course).then(data => {
			if (data.error) {
				this.setState({ error: data.error, loading: false })
				return;
			}
			this.setState({ course: data.payload, loading: false })
		}).catch(error => {
			console.error(error);
			this.setState({ error, loading: false })
		})
	}

	/**
	 * Gets the course
	 * @param {string} courseID The course id
	 * @returns {promise} Returns a promise from the request
	 */
	getCourse = (courseID) => {
		return fetch("https://kentflix-7f510.firebaseapp.com/api/v1/" +
			this.props.token + "/courses/" + courseID, {
				method: "GET",
				mode: "cors",
				cache: "default",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
				redirect: "follow",
				referrer: "no-referrer",
			}).then(response => response.json());
	}

	render() {
		const { loading, course, error } = this.state;
		if (error) {
			return (
				<div className="row">
					<h3>
						Couldn't find that course
						<small>
							Why not <Link to="/new-course/">submit</Link> the course?
						</small>
					</h3>
				</div>
			)
		}

		if (loading) {
			return (
				<div className="loading">
					<div className="spinner primary"></div>
				</div>
			)
		}

		return (
			<div className="row">
				<div className="col-sm-12">
					<h3>
						{course.courseID} - {course.name}
						<small>
							Back to <Link to={"/school/" + course.schoolID}>school</Link>
						</small>
						<small>{course.lectures.length} videos available to watch</small>
					</h3>
				</div>
				{course.lectures.sort((x, y) => new Date(y.date) - new Date(x.date))
					.map(v => (
						<div className="col-sm-12 col-md-4 col-lg-3" key={v.id}>
							<div className="card fluid">
								<video className="section" alt={v.title + " video image"} >
									<source
										className="media"
										src={v.videoURL + "#0.1"}
										type="video/mp4"
									/>
								</video>
								<progress
									className="video-progress"
									value={v.progress || 0}
									max={v.videoLength}
								></progress>
								<h4>
									{v.title} - {v.author}
									<small>{new Date(v.date).toUTCString()}</small>
								</h4>
								<div className="button-group">
									<Link
										to={{
											pathname: "/course/"+course.courseID+ "/"+v.id.toLowerCase().replace(" ", "-")
												.replace(/[^a-z-0-9]/g, ""),
											state: v
										}}
										className="button video-btn-1"
									>
										View
									</Link>
									<button className="video-btn-1" disabled>Watch later</button>
								</div>
							</div>
						</div>
					))}
			</div>
		)
	}
}

export default Course;
