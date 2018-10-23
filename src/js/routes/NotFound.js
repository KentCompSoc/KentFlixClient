import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
	<div className="row">
		<h3>
			Couldn't find that page
			<small>
				<Link to="/report-bug/">Report a bug</Link>
			</small>
		</h3>
	</div>
)

export default NotFound;