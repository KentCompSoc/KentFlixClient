import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Course.css";
//Redux
import { connect } from "react-redux";
import { getCourseById } from "../actions/courses";

class Course extends Component {
	componentDidMount() {
		const { token } = this.props;
		const { course } = this.props.match.params;
		this.props.getCourseById({ token, courseID: course });
	}

	render() {
		const courseID = this.props.match.params.course;
		const { error, course, schoolName } = this.props;

		if (error) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<h2>{this.props.match.params.course}</h2>
					</div>
					<div className="col-sm-12">
						<h3><mark className="secondary">{error}</mark></h3>
					</div>
				</div>
			)
		}

		return (
			<div className="row">
				<div className="col-sm-12">
					<h3>
						{courseID} - {course.name ? course.name : "Loading course..."}
						<small>
							Back to <Link to={"/school/" + course.schoolID}>{
								schoolName ? schoolName : "school"
							}</Link>
						</small>
						<small>
							{course.lectures ? course.lectures.length : "..."} videos
							available to watch
						</small>
					</h3>
				</div>
				{ course.lectures ? course.lectures.sort(
					(x, y) => new Date(y.date) - new Date(x.date)).map(v => (
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
											pathname: "/lecture/"+v.id
												.toLowerCase().replace(" ", "-")
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
					)) : (
						<div className="loading">
							<div className="spinner primary"></div>
						</div>
					)}
			</div>
		)
	}
}

function mapStateToProps ({ user, courses, schools }, ownProps) {
	const courseID = ownProps.match.params.course;
	let course = {};
	let schoolName = null;

	if(courses.data.filter(c => c.id === courseID).length === 1) {
		course = courses.data.filter(c => c.id === courseID)[0];
	}

	if(course.schoolID
		&& schools.data.filter(s => s.id === course.schoolID).length === 1) {
		schoolName = schools.data.filter(s => s.id === course.schoolID)[0].name;
	}

	return {
		token: user.token,
		course,
		schoolName,
		error: courses.error,
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getCourseById: (data) => dispatch(getCourseById(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(Course)
