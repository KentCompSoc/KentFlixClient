import React, { Component } from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
// Routes
import Home from './routes/Home';
import Profile from './routes/Profile';
import Login from './routes/Login';
import Register from './routes/Register';
// Components
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header className="sticky">
            <span className="header-11">
              <Link to="/" className="logo">Logo</Link>
              <Link to="/" className="button">Home</Link>
              <Link to="/profile/" className="button">Profile</Link>
            </span>
            <div className="button header-1">Logout</div>
          </header>

          <div className="container">
            {/* Routes */}
            <Route exact path="/" component={Home} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/register/" component={Register} />
            <Route exact path="/profile/" component={Profile} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
