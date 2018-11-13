import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Displays the school modules and courses
 * @param {string} school The school id
 */
class School extends Component {
	state = {
		school: null,
		loading: true,
		error: false,
	}

	componentDidMount() {
		const { school } = this.props.match.params;
		this.getSchool(school).then(data => {
			if (data.error) {
				this.setState({ error: data.error, loading: false })
				return;
			}

			const course = data.payload.filter(i => i.lectures);
			const module = data.payload.filter(i => i.schools)
			this.setState({ module, course, loading: false })
		}).catch(error => {
			console.error(error);
			this.setState({ error, loading: false })
		})
	}

	/**
	 * Gets the school modules and courses
	 * @param {string} schoolID The school id
	 * @returns {promise} Returns a promise from the request
	 */
	getSchool = (schoolID) => {
		return fetch("https://kentflix-7f510.firebaseapp.com/api/v1/" +
			this.props.token + "/schools/" + schoolID +"/courses", {
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
		const { loading, module, course, error } = this.state;
		const { school } = this.props.match.params;
		if (error) {
			return (
				<div className="row">
					<h3>
						Couldn't find that school
						<small>
							Why not <Link to="/new-school/">submit</Link> the school?
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
					<h2>
						{school}
					</h2>
				</div>
				<div className="collapse">
					<input type="checkbox" id="modules" aria-hidden="true" />
					<label htmlFor="modules" aria-hidden="true">Modules</label>
					<div className="col-sm-12">
						<div className="row">
							{module.map(m => (
								<div className="col-sm-12 col-md-4 col-lg-3" key={m.id}>
									<h4>{m.name}</h4>
								</div>
							))}
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
							{course.map(c => (
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
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default School;
