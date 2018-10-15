import React, { Component } from 'react';

class Contributors extends Component {
	render() {
		const { type, contributors } = this.props;
		if (contributors.loading) {
			return (
				<div className="col-sm-6">
					<p>{type} side:</p>
					<div className="loading">
						<div className="spinner primary"></div>
					</div>
				</div>
			)
		}

		if (contributors.error) {
			return (
				<div className="col-sm-6">
					<p>{type} side:</p>
					<p>Couldn't fetch {type.toLowerCase()} contributors</p>
				</div>
			)
		}

		return (
			<div className="col-sm-6">
				<p>{type} side:</p>
				<div className="row">
					{contributors.data.map(user => (
						<div key={user.id} className="col-sm-3 col-md-1">
							<a href={user.html_url}>
								<img
									src={user.avatar_url}
									className="rounded"
									alt={user.login + "avatar"}
								/>
							</a>
						</div>
					))}
				</div>
			</div>
		)
	}
};

export default Contributors;
