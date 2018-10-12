import React, { Component } from "react";
import "../css/App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
// Routes
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import NewCourse from "./routes/NewCourse";
import Course from "./routes/Course";
import Video from "./routes/Video";
import Login from "./routes/Login";
import Register from "./routes/Register";
// Components
import Footer from "./components/Footer";

class App extends Component {
	state = {
		token: null
	}

	componentDidMount() {
		//this.setState({ token: localStorage.getItem("token") });
	}

	setToken = token => {
		this.setState({ token });
		localStorage.setItem("token", token);
		console.log("Logged in user");
	}

	clearToken = () => {
		this.setState({ token: null });
		localStorage.removeItem("token");
		console.log("Logged out user");
	}
	render() {
		const { token } = this.state;
		return (
			<Router>
				<ScrollToTop>
					<header className="sticky">
						<span className="header-11">
							<Link to="/" className="logo">Logo</Link>
							<Link to="/" className="button">Home</Link>
							<Link to="/2018/CO510/" className="button">Course</Link>
						</span>
						{token ? (
							<div className="button header-1" onClick={this.clearToken}>
								Logout
							</div>
						) : (
								<Link to="/login/" className="button header-1">Login</Link>
							)}
					</header>

					<div className="container">
						{/* Routes */}
						<Route exact path="/" component={Home} />
						<Route exact path="/new-course/" component={NewCourse} />
						<Route exact path="/:year/:course/" component={Course} />
						<Route exact path="/:year/:course/:video/" component={Video} />
						<Route exact path="/login/" render={props =>
							<Login {...props} setToken={this.setToken} />
						} />
						<Route exact path="/register/" component={Register} />
						<Route exact path="/profile/" component={Profile} />
					</div>
					<Footer />
				</ScrollToTop>
			</Router>
		);
	}
}

export default App;
