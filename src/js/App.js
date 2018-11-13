import React, { Component } from "react";
import "../css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
// Routes
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import NewCourse from "./routes/NewCourse";
import NewSchool from "./routes/NewSchool";
import Course from "./routes/Course";
import Video from "./routes/Video";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NotFound from "./routes/NotFound";
// Components
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
	state = {
		token: localStorage.getItem("token")
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
					<Header token={token} clearToken={this.clearToken} />
					<div className="container">
						{/* Routes */}
						<Switch>
							{/* Private routes */}
							<PrivateRoute
								path="/dashboard/"
								exact
								component={Home}
								token={token}
							/>
							<PrivateRoute
								path="/course/:course/"
								exact
								component={Course}
								token={token}
							/>
							<PrivateRoute
								path="/course/:course/:video/"
								exact
								component={Video}
								token={token}
							/>
							<PrivateRoute
								path="/new-school/"
								exact
								component={NewSchool}
								token={token}
							/>
							<PrivateRoute
								path="/new-course/"
								exact
								component={NewCourse}
								token={token}
							/>
							<PrivateRoute
								path="/profile/"
								exact
								component={Profile}
								token={token}
							/>

							{/* Public routes */}
							<Route exact path="/login/" render={props =>
								<Login
									{...props}
									setToken={this.setToken}
									token={Boolean(token)}
								/>
							} />
							<Route exact path="/register/" component={Register} />
							<Route
								path="/report-bug/"
								exact
								component={() => window.location =
									"https://github.com/KentCompSoc/KentFlixClient/issues/new?template=bug_report.md"
								}
							/>
							<Route component={NotFound} />
						</Switch>
					</div>
					<Footer />
				</ScrollToTop>
			</Router>
		);
	}
}

export default App;
