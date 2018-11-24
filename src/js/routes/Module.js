import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Course.css";
//Redux
import { connect } from "react-redux";
import { getLecturesByModuleID } from "../actions/lectures";

class Module extends Component {
	componentDidMount() {
		const { token } = this.props;
		const { module } = this.props.match.params;
		this.props.getLecturesByModuleID({ token, moduleID: module });
	}

	render() {
		const moduleID = this.props.match.params.module;
		const { error, name, courseID, courseName } = this.props;
		let { lectures } = this.props;
		if(lectures) {
			lectures = Object.values(lectures)
				.sort((a, b) => new Date(b.date) - new Date(a.date));
		}

		if (error && error.message) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<h3>
							{moduleID}
							{courseID && (
								<small>
								Back to <Link to={"/course/" + courseID}>{
									courseName ? courseName : "course"
								}</Link>
							</small>
							)}
						</h3>
					</div>
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
						{moduleID} - {name}
						{courseID && (
							<small>
								Back to <Link to={"/course/" + courseID}>{
									courseName ? courseName : "course"
								}</Link>
							</small>
						)}
						<small>
							{lectures ? Object.keys(lectures).length : "..."} videos
							available to watch
						</small>
					</h3>
				</div>
				{ lectures ? Object.keys(lectures).map(key => (
					<div className="col-sm-12 col-md-4 col-lg-3" key={key}>
						<div className="card fluid">
							<video className="section" alt={lectures[key].title + " video image"} >
								<source
									className="media"
									src={lectures[key].videoURL + "#0.1"}
									type="video/mp4"
								/>
							</video>
							<progress
								className="video-progress"
								value={lectures[key].progress || 0}
								max={lectures[key].videoLength}
							></progress>
							<h4>
								{lectures[key].title} - {lectures[key].author}
								<small>{new Date(lectures[key].date).toUTCString()}</small>
							</h4>
							<div className="button-group">
								<Link
									to={"/lecture/"+key.replace(/\./g, "-")}
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
		error,
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
)(Module)
