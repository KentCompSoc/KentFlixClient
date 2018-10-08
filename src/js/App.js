import React, { Component } from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
// Routes
import Home from './routes/Home';
import Profile from './routes/Profile';
import Login from './routes/Login';

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
            <Route exact path="/profile/" component={Profile} />
          </div>

          <footer>
            <p>
              Made with <i className="far fa-heart" title="love" aria-hidden>
              </i> <span className="sr-only">love</span> by students for
              students
            </p>
            <p><Link to="/about/">About</Link></p>
            <div className="button small">
              <a href="https://github.com/KentCompSoc/KentFlixClient/">
                <i
                  className="fab fa-github"
                  title="GitHub link"
                  aria-hidden
                ></i>
                <span className="sr-only">GitHub link</span>
              </a>
            </div>
            <div className="button small">
              <a href="https://www.facebook.com/groups/kentcomputingsociety/">
                <i
                  className="fab fa-facebook-square"
                  title="Facebook link"
                  aria-hidden
                ></i>
                <span className="sr-only">Facebook link</span>
              </a>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
