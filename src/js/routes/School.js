import React from "react";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getSchoolById } from "../actions/schools";
/**
 * Displays the school modules and courses
 * @param {string} school The school id
 */
const School = (props) => {
	const { module, course, error, token } = props;
	const { school } = props.match.params;

	if(!module && !course && !error) {
		props.getSchoolById({ token, schoolID: school });
	}

	if (error) {
		return (
			<div className="row">
				<div className="col-sm-12">
					<h2>
						{school}
					</h2>
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
				<h2>
					{school}
				</h2>
			</div>
			<div className="collapse">
				<input type="checkbox" id="modules" aria-hidden="true" />
				<label htmlFor="modules" aria-hidden="true">Modules</label>
				<div className="col-sm-12">
					<div className="row">
						{module && module[school] ? (
							module.map(m => (
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
						{course && course[school] ? (
							course.map(c => (
								<Link
									className="col-sm-12 col-md-4 col-lg-3"
									key={c.courseID}
									to={"/course/"+c.courseID}
								>
									<div className="card fluid">
										<h4>
											{c.courseID} - {c.name}
											<small>{c.lectures.length} recordings available</small>
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
		</div>
	)
}

function mapStateToProps ({ user, schools }) {
	return {
		token: user.token,
		module: schools.module,
		course: schools.course,
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
