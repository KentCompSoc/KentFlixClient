import React, { Component } from "react";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getCoursesBySchoolID } from "../actions/courses";
/**
 * Displays the school modules and courses
 * @param {string} school The school id
 */
class School extends Component {
	componentDidMount() {
		const { token } = this.props;
		const { school } = this.props.match.params;
		this.props.getCoursesBySchoolID({ token, schoolID: school });
	}

	render() {
		const { school, courses, error } = this.props;
		const schoolID = this.props.match.params.school;

		if (error) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<h2>{school ? school.name : schoolID}</h2>
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
					<h2>{school && school.name ? school.name : schoolID}</h2>
				</div>
				{ courses ? Object.keys(courses).map(c => (
					<Link
						className="col-sm-12 col-md-4 col-lg-3"
						key={c}
						to={"/course/"+c}
					>
						<div className="card fluid">
							<h4>{c} - {courses[c].name}</h4>
						</div>
					</Link>
				)) : (
					<div className="col-sm-12">
						<div className="loading">
							<div className="spinner primary"></div>
						</div>
					</div>
				)}
			</div>
		)
	}
}

function mapStateToProps ({ user, schools, courses }, ownProps) {
	const schoolID = ownProps.match.params.school;

	return {
		token: user.token,
		school: schools[schoolID],
		courses: courses[schoolID],
		error: schools.error
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getCoursesBySchoolID: (data) => dispatch(getCoursesBySchoolID(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(School)
