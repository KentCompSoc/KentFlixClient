import React, { Component } from "react";
import '../../css/Form.css';

class NewCourse extends Component {
	state = {
		rss: {
			value: "",
			error: "",
		},
		loading: false,
		success: false
	};

	handleChange = type => event => {
		this.setState({
			[type]: { value: event.target.value }
		});
	};

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
				<div className="
					col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3
				">
					{ course && (
						<React.Fragment>
							<h4>
								{course.name}
								<small>Found {course.lectures.length} lectures</small>
							</h4>	
							<ul>
								{ course.lectures.map(lecture => (
									<li key={lecture.url}>{lecture.name}</li>
								))}
							</ul>
						</React.Fragment>
					)}
				</div>
			</div>
		)
	}
}

export default NewCourse;
