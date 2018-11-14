import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../css/Home.css";
//Redux
import { connect } from "react-redux";
import { getSchools } from "../actions/schools";

class Dashboard extends Component {
	componentDidMount() {
		this.props.getSchools({token: this.props.token});
	}

	render() {
		const {error, schools } = this.props;
		return (
			<div className="row">
				<div className="col-sm-12"><h2>Schools</h2></div>

				{( error && (
					<div>
						Error: { error }
					</div>
				))}

				{( schools ? (
					<div className="col-sm-12">
						<div className="row">
							{ schools.map(school => (
								<div key={school.id} className="col-sm-6 col-lg-3">
									<Link to={"/school/"+school.id}>{school.name}</Link>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className="loading">
						<div className="spinner primary"></div>
					</div>
				))}	
			</div>
		)
	}
};

function mapStateToProps ({ user, schools }) {
	return {
		token: user.token,
		error: schools.error,
		loading: schools.loading,
		schools: schools.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getSchools: (data) => dispatch(getSchools(data))
	}
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(Dashboard)

