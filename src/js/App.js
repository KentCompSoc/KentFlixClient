import React, { Component } from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
// Routes
import Home from './routes/Home';
import Profile from './routes/Profile';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header class="sticky">
            <Link to="/" class="logo">Logo</Link>
            <Link to="/" class="button">Home</Link>
            <Link to="/profile/" class="button">Profile</Link>
          </header>

          <div class="container">
            {/* Routes */}
            <Route exact path="/" component={Home} />
            <Route exact path="/profile/" component={Profile} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
