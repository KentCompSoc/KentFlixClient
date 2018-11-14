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
		const { schools, error } = this.props;
		const { school } = this.props.match.params;
		let selectedSchool = schools.filter(s => s.id === school)[0];

		if (error) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<h2>{school}</h2>
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
					<h2>{school}</h2>
				</div>
				{ selectedSchool ? (
					<div className="collapse">
						<input type="checkbox" id="modules" aria-hidden="true" />
						<label htmlFor="modules" aria-hidden="true">Modules</label>
						<div className="col-sm-12">
							<div className="row">
								{ selectedSchool.modules ? (
									selectedSchool.modules.map(m => (
										<div className="col-sm-12 col-md-4 col-lg-3" key={m.id}>
											<h4>{m.name}</h4>
										</div>
									))
								) : (
									<div className="loading">
										<div className="spinner primary"></div>
									</div>
								)}
							</div>
						</div>
						<input
							type="checkbox"
							id="courses"
							defaultChecked
							aria-hidden="true"
						/>
						<label htmlFor="courses" aria-hidden="true">Courses</label>
						<div className="col-sm-12">
							<div className="row">
								{ selectedSchool.courses ? (
									selectedSchool.courses.map(c => (
										<Link
											className="col-sm-12 col-md-4 col-lg-3"
											key={c.courseID}
											to={"/course/"+c.courseID}
										>
											<div className="card fluid">
												<h4>
													{c.courseID} - {c.name}
													<small>{c.lectureCount} recordings available</small>
												</h4>
											</div>
										</Link>
									))
								) : (
									<div className="loading">
										<div className="spinner primary"></div>
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className="loading">
						<div className="spinner primary"></div>
					</div>
				)}
			</div>
		)
	}
}

function mapStateToProps ({ user, schools }, ownProps) {
	return {
		token: user.token,
		schools: schools.data.filter(s => s.id === ownProps.match.params.school),
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
