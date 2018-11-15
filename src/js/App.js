import React from "react";
import "../css/App.css";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
// Routes
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import NewCourse from "./routes/NewCourse";
import NewSchool from "./routes/NewSchool";
import School from "./routes/School";
import Course from "./routes/Course";
import Video from "./routes/Video";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NotFound from "./routes/NotFound";
// Components
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
	return (
		<Router>
			<ScrollToTop>
				<Header />
				<div className="container">
					{/* Routes */}
					<Switch>
						{/* Private routes */}
						<PrivateRoute
							path="/dashboard/"
							exact
							component={Dashboard}
						/>
						<PrivateRoute
							path="/school/:school/"
							exact
							component={School}
						/>
						<PrivateRoute
							path="/course/:course/"
							exact
							component={Course}
						/>
						<PrivateRoute
							path="/course/:course/:video/"
							exact
							component={Video}
						/>
						<PrivateRoute
							path="/new-school/"
							exact
							component={NewSchool}
						/>
						<PrivateRoute
							path="/new-course/"
							exact
							component={NewCourse}
						/>
						<PrivateRoute
							path="/profile/"
							exact
							component={Profile}
						/>
						<Redirect exact from="/" to="/dashboard/" />

						{/* Public routes */}
						<Route exact path="/login/" render={props =>
							<Login {...props} />
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

export default App;
