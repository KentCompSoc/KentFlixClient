import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  state = {
    theme: "dark"
  }

  changeSheet = sheetTheme => event => {
    const sheet = document.getElementById("mini-css");
    sheet.href = sheet.href.replace(this.state.theme, sheetTheme);
    this.setState({ theme: sheetTheme });
  }
  render() {
    const { theme } = this.state;
    return (
      <footer>
        <p>
          Made with <i className="far fa-heart" title="love" aria-hidden>
          </i> <span className="sr-only">love</span> by students for students
        </p>
        <p><Link to="/about/">About</Link></p>
        <form>
          <legend>Theme</legend>
          <div>
            <input
              type="radio"
              onChange={this.changeSheet("dark")}
              checked={theme === "dark"}
              id="dark"
              name="dark"
              value="dark"
            />
            <label htmlFor="dark">Dark</label>
          </div>
          <div>
            <input
              type="radio"
              onChange={this.changeSheet("default")}
              checked={theme === "default"}
              id="light"
              name="light"
              value="light"
            />
            <label htmlFor="light">Light</label>
          </div>
          <div>
            <input
              type="radio"
              onChange={this.changeSheet("nord")}
              checked={theme === "nord"}
              id="nord"
              name="nord"
              value="nord"
            />
            <label htmlFor="nord">Nord</label>
          </div>
        </form>
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
    )
  }
};

export default Footer;
