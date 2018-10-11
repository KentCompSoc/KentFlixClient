import React, { Component } from "react";
import '../../css/Form.css';

/**
 * A form to submit a new course rss which is converted into json data and
 * submitted to the server.
 */
class NewCourse extends Component {
	state = {
		rss: {
			value: "",
			error: "",
		},
		loading: false,
		success: false
	};

	/**
	 * Updates the value of a input as the user types inside it
	 * @param {String} type Which input to update
	 */
	handleChange = type => event => {
		this.setState({
			[type]: { value: event.target.value }
		});
	};

	/**
	 * Handles form submission.
	 */
	submit = () => event => {
		event.preventDefault();
		const rss = this.state.rss.value;

		if (!rss) {
			this.setState({
				rss: { error: "Please provide the RSS feed content" }
			})
			return;
		}

		const course = this.parseRss(rss);
		if(!course) {
			this.setState({ rss: { error: "Invalid RSS feed"} });
			return;
		}

		/*
		console.log("Submitting form...");
		this.setState({ loading: true });

		this.submitRSS({ feed: course })
			.then(data => {
				console.log(JSON.stringify(data));
				// Redirect user to verify account
				return (
					<div>It worked</div>
				)
			})
			TODO: Process errors
			.catch(error => {
				console.error(error);
				this.setState({ loading: false })
			});
		*/
	}

	/**
	 * Parses the rss feed to a json object.
	 * @param {String} rss The rss feed
	 * @returns {json} A json object container the course name, course link and
	 * lectures
	 */
	parseRss = (rss) => {
		const parser = new DOMParser();
		const parsedRss = parser.parseFromString(rss, "text/xml");

		// Check valid rss
		if (parsedRss.getElementsByTagName("title").length === 0 &&
			parsedRss.getElementsByTagName("link").length === 0) {
			return null;
		}

		// Gets the title and link of the course
		let course = {
			name: parsedRss.getElementsByTagName("title")[0].childNodes[0].nodeValue,
			url: parsedRss.getElementsByTagName("link")[0].childNodes[0].nodeValue
		}
		// Gets the amount of lectures
		const lectureCount = parsedRss.getElementsByTagName("item").length;
		// Gets all the lectures
		const parsedLectures = parsedRss.getElementsByTagName("item");
		// Gets all the lectures name
		let lectures = [];
		for (let i = 0; i < lectureCount; i++) {
			// Create the lecture object
			const lecture = {
				name: parsedLectures[i].getElementsByTagName("title")[0].childNodes[0].nodeValue,
				author: parsedLectures[i].getElementsByTagName("itunes:author")[0].childNodes[0].nodeValue,
				summary: parsedLectures[i].getElementsByTagName("itunes:summary")[0].childNodes[0].nodeValue,
				url: parsedLectures[i].getElementsByTagName("guid")[0].childNodes[0].nodeValue,
				published: parsedLectures[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue,
				duration: parsedLectures[i].getElementsByTagName("itunes:duration")[0].childNodes[0].nodeValue
			}
			// Add the lecture to the lectures array
			lectures = [...lectures, lecture];
		}
		course = { ...course, lectures };

		this.setState({
			course
		})

		return course;
	}

	/**
	 * Uploads the rss feed to the database
	 * @param {object} data The data to be uploaded
	 * @returns {promise} Returns a promise from the request
	 */
	submitRSS = (data = {}) => {
		return fetch("", {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			redirect: "follow",
			referrer: "no-referrer",
			body: JSON.stringify(data),
		}).then(response => response.json());
	}

	/**
	 * Changes the time from seconds to a human friendly time
	 * @param {String} duration The duration in seconds
	 * @returns {String} A human readable time hh:mm:ss
	 */
	humanTime = (duration) => {
		let humanTime = new Date(null);
		humanTime.setSeconds(duration);
		return humanTime.toISOString().substr(11, 8);
	}

	render() {
		const { rss, course, loading } = this.state;
		return (
			<div className="row">
				<div className="
					col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3
				">
					<form onSubmit={this.submit()} autoComplete="on">
						<legend><h1 className="form-header">Register a course</h1></legend>
						<div className="input-group vertical">
							<label htmlFor="rss">
								RSS feed
								{ rss.error && (
									<mark className="secondary">{rss.error}</mark>
								)}
							</label>
							<textarea
								onChange={this.handleChange("rss")}
								value={rss.value || ''}
								type="text"
								id="rss"
								name="rss"
								disabled={loading}
								autoFocus
							/>
						</div>
						<div className="btn-container">
							{ loading && (
								<div className="loading">
									<div className="spinner primary"></div>
								</div>
							)}
							<div className="button-group btn-group">
								<button
									className="primary shadowed btn-1"
									type="submit"
									disabled={loading}
								>
									Register course
								</button>
							</div>
						</div>
					</form>
				</div>
				<div className="col-sm-12">
					{ course && (
							<table className="striped">
								<caption>
									<h4>
										{course.name}
										<small>Found {course.lectures.length} lectures</small>
									</h4>
								</caption>
								<thead>
									<tr>
										<th>Name</th>
										<th>Author</th>
										<th>Published</th>
										<th>Duration</th>
									</tr>
								</thead>
								<tbody>
									{course.lectures.map(lecture => (
										<tr key={lecture.url}>
											<td data-label="name">{lecture.name}</td>
											<td data-label="author">{lecture.author}</td>
											<td data-label="author">{lecture.published}</td>
											<td data-label="author">{
												this.humanTime(lecture.duration)
											}</td>
										</tr>
									))}
								</tbody>
							</table>
					)}
				</div>
			</div>
		)
	}
}

export default NewCourse;
