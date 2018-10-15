import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
	<div className="row">
		<div className="col-sm-12">Home</div>
		<div className="col-sm-12">Temp links</div>
		<div className="col-sm-12">
			<ul>
				<li><Link to="/2018/CO510/">CO510</Link></li>
			</ul>
		</div>
	</div>
);

export default Home;
