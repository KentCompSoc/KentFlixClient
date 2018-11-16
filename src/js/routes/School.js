import React, { Component } from "react";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getSchoolById } from "../actions/schools";
/**
 * Displays the school modules and courses
 * @param {string} school The school id
 */
class School extends Component {
	componentDidMount() {
		const { token } = this.props;
		const { school } = this.props.match.params;
		this.props.getSchoolById({ token, schoolID: school });
	}

	render() {
		const { school, error, schoolName } = this.props;
		const schoolID = this.props.match.params.school;

		if (error) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<h2>{schoolName ? schoolName : schoolID}</h2>
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
					<h2>{schoolName ? schoolName : schoolID}</h2>
				</div>
				{ school ? school.courses ? (school.courses.map(c => (
							<Link
								className="col-sm-12 col-md-4 col-lg-3"
								key={c.id}
								to={"/course/"+c.id}
							>
								<div className="card fluid">
									<h4>{c.id} - {c.name}</h4>
								</div>
							</Link>
						))
					) : (
						<div className="col-sm-12">
							<div className="loading">
								<div className="spinner primary"></div>
							</div>
						</div>
				) : (
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

function mapStateToProps ({ user, schools }, ownProps) {
	const schoolID = ownProps.match.params.school;
	let school = {};

	if(schools.data.filter(s => s.id === schoolID).length === 1) {
		school = schools.data.filter(s => s.id === schoolID)[0];
	}

	const schoolName = school.name;

	return {
		token: user.token,
		school,
		schoolName,
		error: schools.error
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getSchoolById: (data) => dispatch(getSchoolById(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(School)
