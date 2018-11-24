// React
import React, { Component } from 'react';
// Markdown
import { markdown } from 'markdown';

class About extends Component {
	state = {
		readme: null,
		error: null,
	}
	componentDidMount() {
		//this.props.getSchools({token: this.props.token});
		fetch("https://api.github.com/repos/KentCompSoc/KentFlixClient/readme")
			.then(res => res.json())
			.then(result => {
				this.setState({
					readme: markdown.toHTML(window.atob(result.content))
				})
			})
			.catch(error => {
				this.setState({ error	});
			})
	}

	render() {
		const { error, readme } = this.state;
		if(error) {
			return (
				<div className="row">
					<div className="col-sm-12"><h2>About</h2></div>
					<div className="col-sm-12">Error: { error }</div>
				</div>
			)
		}

		if(readme) {
			return (
			<div className="row">
				<div className="col-sm-12"><h2>About</h2></div>
				<div className="col-sm-12" dangerouslySetInnerHTML={{__html: readme}}>
				</div>
			</div>
			)
		}

		return (
			<div className="row">
				<div className="col-sm-12"><h2>About</h2></div>
				<div className="loading">
					<div className="spinner primary"></div>
				</div>
			</div>
		)
	}
}
export default About

