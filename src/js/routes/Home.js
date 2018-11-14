import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../css/Home.css";

class Home extends Component {
	state = {
		schools: null,
		loading: true,
		error: false,
	}

	componentDidMount() {
		this.getSchools().then(data => {
			if(data.error) {
				this.setState({ error: data.message, loading: false })
				console.error(data.message);
				return;
			}
			this.setState({ schools: data.payload, loading: false })
		}).catch(error => {
			console.error(error);
			this.setState({ error: error.message, loading: false })
		})
	}

	/**
	 * Gets the schools
	 * @returns {promise} Returns a promise from the request
	 */
	getSchools = () => {
		return fetch("https://kentflix-7f510.firebaseapp.com/api/v1/"+this.props.token+"/schools", {
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
		const { loading, error, schools } = this.state;
		return (
			<div className="row">
				<div className="col-sm-12"><h2>Schools</h2></div>
				{( loading && (
					<div className="loading">
						<div className="spinner primary"></div>
					</div>
				))}

				{( error && (
					<div>
						Error: { error }
					</div>
				))}

				{( schools && (
					<div className="col-sm-12">
						<div className="row">
							{ schools.map(school => (
								<div key={school.id} className="col-sm-6 col-lg-3">
									<Link to={"/school/"+school.id}>{school.name}</Link>
								</div>
							))}
						</div>
					</div>
				))}	
			</div>
		)
	}
};

export default Home;
