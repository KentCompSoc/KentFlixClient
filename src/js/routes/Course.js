import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Course.css";
//Redux
import { connect } from "react-redux";
import { getCourseModulesByCourseId } from "../actions/modules";
import { getCourseById } from "../actions/courses";

class Course extends Component {
	componentDidMount() {
		const { token } = this.props;
		const { course } = this.props.match.params;
		this.props.getCourseModulesByCourseId({ token, courseID: course });
		this.props.getCourseById({ token, courseID: course });
	}

	render() {
		const courseID = this.props.match.params.course;
		const { error, modules, schoolID, schoolName, name } = this.props;
		const years = [3, 2, 1];

		if (error && error.message) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<h2>{courseID}</h2>
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
						{courseID} - {name}
						<small>
							Back to <Link to={"/school/" + schoolID}>{
								schoolName ? schoolName : "school"
							}</Link>
						</small>
					</h3>
				</div>
				{ modules ? years.map(y => (
					<React.Fragment key={y}>
						<h2 className="col-sm-12">Stage {y}</h2>
						{
							Object.keys(modules).filter(key => modules[key].stage === y).length !== 0 ? (
								Object.keys(modules).filter(key => modules[key].stage === y).map(key => (
									<Link
										className="col-sm-12 col-md-4 col-lg-3"
										key={key}
										to={"/module/"+key}
									>
										<div className="card fluid">
											<h4>{key} - {modules[key].name}</h4>
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

function mapStateToProps (
		{ user, schools, courses, modules, error },
		ownProps
	) {
	const courseID = ownProps.match.params.course;
	let schoolID, schoolName, name = null
	const schoolKey = Object.keys(courses)
		.filter(key => courses[key][courseID] !== null)[0];
	if(schoolKey) {
		schoolID = schoolKey;
		name = courses[schoolKey][courseID].name;
		if(schools[schoolKey]) {
			schoolName = schools[schoolKey].name;
		}
	}
	return {
		token: user.token,
		course: courses[courseID],
		modules: modules[courseID],
		name,
		schoolID,
		schoolName,
		error
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getCourseModulesByCourseId: (data) => dispatch(
			getCourseModulesByCourseId(data)
		),
		getCourseById: (data) => dispatch(getCourseById(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(Course)
