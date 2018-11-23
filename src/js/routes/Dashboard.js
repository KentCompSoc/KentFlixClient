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
		const { error, schools } = this.props;
		if(error) {
			return (
				<div className="row">
					<div className="col-sm-12"><h2>Schools</h2></div>
					<div className="col-sm-12">Error: { error }</div>
				</div>
			)
		}

		if(schools) {
			return (
			<div className="row">
				<div className="col-sm-12"><h2>Schools</h2></div>
				<div className="col-sm-12">
					<div className="row">
						{ schools.length === 0 ? (
							<div className="col-sm-12">No schools found</div>
						) : Object.keys(schools).map(id => (
							<div key={id} className="col-sm-6 col-lg-3">
								<Link to={"/school/"+id}>{schools[id].name}</Link>
							</div>
						))}
					</div>
				</div>
			</div>
			)
		}

		return (
			<div className="row">
				<div className="col-sm-12"><h2>Schools</h2></div>
				<div className="loading">
					<div className="spinner primary"></div>
				</div>
			</div>
		)
	}
}

function mapStateToProps ({ user, schools, error }) {
	return {
		token: user.token,
		schools,
		error: error.message
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

