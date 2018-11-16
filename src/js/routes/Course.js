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
		const years = ["3", "2", "1"];

		if (error) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<h2>{courseID}</h2>
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
						{courseID}
						<small>
							Back to <Link to={"/school/" + course.schoolID}>{
								schoolName ? schoolName : "school"
							}</Link>
						</small>
					</h3>
				</div>
				{ course.modules ? years.map(y => (
					<React.Fragment key={y}>
						<h2 className="col-sm-12">Stage {y}</h2>
						{
							course.modules.filter(m => m.stage === y).length !== 0 ? (
								course.modules.filter(m => m.stage === y).map(m => (
									<Link
										className="col-sm-12 col-md-4 col-lg-3"
										key={m.id}
										to={"/module/"+m.id}
									>
										<div className="card fluid">
											<h4>{m.id} - {m.name}</h4>
										</div>
									</Link>
								))
							) : (
								<div className="col-sm-12">No modules found for stage {y}</div>
							)
						} {
							y !== "1" && (
								<hr className="col-sm-12" />
							)
						}
					</React.Fragment>
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
