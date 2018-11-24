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
import Module from "./routes/Module";
import Lecture from "./routes/Lecture";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NotFound from "./routes/NotFound";
// Components
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
// Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
	return (
		<React.Fragment>
			<CssBaseline />
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
								path="/module/:module/"
								exact
								component={Module}
							/>
							<PrivateRoute
								path="/lecture/:lecture/"
								exact
								component={Lecture}
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
							<Route component={NotFound} />
						</Switch>
					</div>
					<Footer />
				</ScrollToTop>
			</Router>
		</React.Fragment>
	);
}

export default App;
